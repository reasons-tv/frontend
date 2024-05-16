import { useSelector, useDispatch } from 'react-redux'

import { setUrl, loadVideo } from '../features/editor/editorSlice'

function VideoSearchForm() {
    const url = useSelector((state) => state.editor.url)
    const dispatch = useDispatch()

    return (
        <form className='video-search-form' onSubmit={(e) => {e.preventDefault(); dispatch(loadVideo())}}>
            <label>
                <input
                    type="text"
                    value={url}
                    placeholder='https://www.youtube.com/watch?v=***********'
                    style={{ width: "300px" }}
                    onChange={(e) => dispatch(setUrl(e.target.value))}
                />
            </label>
            <button type="submit" style={{ 'width': '48px' }}>Load</button>
        </form>
    );
}

export default VideoSearchForm;
