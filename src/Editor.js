import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux'

import './App.css';
import VideoSearchForm from './components/VideoSearchForm';
import EditFragmentForm from './components/EditFragmentForm';
import { setPlaying, setPlayed, setDuration, setLoaded, setPip, addPoint, deletePoint, setPlaybackRate, editFragment } from './features/editor/editorSlice'
import { formatTime } from './utils'

export default function Editor() {
  const vid = useSelector((state) => state.editor.vid)
  const showPlayer = useSelector((state) => state.editor.showPlayer)
  const playing = useSelector((state) => state.editor.playing)
  const seeking = useSelector((state) => state.editor.seeking)
  const pip = useSelector((state) => state.editor.pip)
  const loop = useSelector((state) => state.editor.loop)
  const light = useSelector((state) => state.editor.light)
  const muted = useSelector((state) => state.editor.muted)
  const volume = useSelector((state) => state.editor.volume)
  const controls = useSelector((state) => state.editor.controls)
  const played = useSelector((state) => state.editor.played)
  const playbackRate = useSelector((state) => state.editor.playbackRate)
  const pointList = useSelector((state) => state.editor.pointList)
  const dispatch = useDispatch()

  const player = useRef(null);

  const handleProgress = ({ played: pld, playedSeconds: pldSeconds, loaded: ldd, loadedSeconds: lddSeconds }) => {
    if (!seeking) {
      dispatch(setPlayed(pldSeconds))
      dispatch(setLoaded(ldd))
    }
  }

  const isAddPointDisabled = () => {
    return pointList.indexOf(played) !== -1 || pointList.length >= 4
  }

  return (
    <div className="App">
      <header className="centered">
        <h1>editor</h1>
        <hr style={{ 'marginBottom': 32 }} />
        <VideoSearchForm></VideoSearchForm>
      </header>
      <main>
        {vid &&
          <section className="centered twosided">
            <div style={{ 'marginTop': '7vh', 'marginRight': '10%' }} >
              {pointList.length === 4 &&
                <div className='foursided' style={{ 'fontSize': '12px' }}>
                  <div>Question Start</div>
                  <div>Question End</div>
                  <div>Answer Start</div>
                  <div>Answer End</div>
                </div>
              }
              <div className="foursided">
                {pointList.map(function (p, i) {
                  return (
                    <div key={i}>
                      <div style={{ 'fontSize': '18px' }}>{formatTime(p)}</div>
                      <button
                        className="delTime"
                        onClick={() => dispatch(deletePoint(i))}>x</button>
                    </div>);
                })}
              </div>
              <div className="player-controls">
                <button onClick={() => player.current.seekTo(played - 7.0)} >-7s</button>
                <button onClick={() => player.current.seekTo(played - 3.0)} >-3s</button>
                <button onClick={() => dispatch(setPlaying())}>&#x23EF;</button>
                <button onClick={() => player.current.seekTo(played + 3.0)} >+3s</button>
                <button onClick={() => player.current.seekTo(played + 7.0)} >+7s</button>
                {pointList.length === 4
                  ? <button onClick={e => dispatch(editFragment())}>Edit Fragment &#x21E9;</button>
                  : <button onClick={() => dispatch(addPoint())} disabled={isAddPointDisabled()}>Add Point &#x21B5;</button>}
              </div>
            </div>
            {showPlayer && <div className='player-wrapper'>
              <ReactPlayer
                ref={player}
                className='react-player'
                width='100%'
                height='100%'
                url={`https://youtu.be/${vid}`}
                pip={pip}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onPlay={() => dispatch(setPlaying(true))}
                onPause={() => dispatch(setPlaying(false))}
                onEnablePIP={() => dispatch(setPip(true))}
                onDisablePIP={() => dispatch(setPip(false))}
                onPlaybackRateChange={(speed) => dispatch(setPlaybackRate(parseFloat(speed)))}
                onSeek={e => console.log('onSeek', e)}
                onEnded={() => dispatch(setPlaying(loop))}
                onError={e => console.log('onError', e)}
                onProgress={handleProgress}
                onDuration={(dur) => dispatch(setDuration(dur))}
                onPlaybackQualityChange={e => console.log('onPlaybackQualityChange', e)}
              />
            </div>}
          </section>
        }
        <section className="centered">
          {showPlayer && <EditFragmentForm></EditFragmentForm>}
        </section>
      </main>
    </div>
  );
}
