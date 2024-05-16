import { createSlice } from '@reduxjs/toolkit'

import { youtube_parser } from '../../utils';

const initialState = {
    url: '',
    vid: '',
    pointList: [],
    showPlayer: false,
    controls: true,
    loaded: 0,
    played: 0,
    playbackRate: 1.0,
    volume: 0.8,
    pip: false,
    muted: false,
    light: false,
    playing: false,
    questionStart: null,
    questionEnd: null,
    questionText: '',
    answerStart: null,
    answerEnd: null,
    answerText: '',
    editFragmentData: [],
    chartWidth: window.innerWidth * 0.9,
    selectedLabels: [],
    suggestedLabels: [{ 'label': 'aaa', 'value': 'aaa' },
    { 'label': 'aa', 'value': 'aa' },
    { 'label': 'a', 'value': 'a' }],
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        loadVideo: (state) => {
            state.vid = youtube_parser(state.url)
            state.showPlayer = true
            state.played = 0
            state.loaded = 0
            state.pip = false
        },
        setUrl: (state, action) => {
            state.url = action.payload
        },
        setPlaying: (state, action) => {
            const newPlaying = action.payload
            if (newPlaying === undefined) {
                state.playing = !state.playing
            } else {
                state.playing = Boolean(newPlaying)
            }
        },
        setPlaybackRate: (state, action) => {
            state.playbackRate = action.payload
        },
        setDuration: (state, action) => {
            state.duration = action.payload
        },
        setPlayed: (state, action) => {
            state.played = action.payload
        },
        setLoaded: (state, action) => {
            state.loaded = action.payload
        },
        setPip: (state, action) => {
            const newPip = action.payload
            if (newPip === undefined) {
                state.pip = !state.pip
            } else {
                state.pip = Boolean(newPip)
            }
        },
        setFormWidth: (state, action) => {
            state.chartWidth = action.payload
        },
        setQuestionText: (state, action) => {
            state.questionText = action.payload
        },
        setAnswerText: (state, action) => {
            state.answerText = action.payload
        },
        setSuggestedLabels: (state, action) => {
            state.suggestedLabels = action.payload
        },
        setSelectedLabels: (state, action) => {
            state.selectedLabels = action.payload
        },
        addPoint: (state) => {
            if (state.pointList.length < 4) {
                const newPointList = [...state.pointList, state.played]
                newPointList.sort((a, b) => a - b)
                state.pointList = newPointList;
            }
        },
        deletePoint: (state, i) => {
            const newPointList = [...state.pointList];
            newPointList.splice(i, 1);
            state.pointList = newPointList;
        },
        editFragment: (state) => {
            if (state.pointList.length === 4) {
                state.playing = false
                state.questionStart = state.pointList[0]
                state.questionEnd = state.pointList[1]
                state.answerStart = state.pointList[2]
                state.answerEnd = state.pointList[3]
            }
        },
        submitFragment: (state) => {

        }
    },
})

// Action creators are generated for each case reducer function
export const {
    submitFragment, editFragment, loadVideo,
    deletePoint, addPoint,
    setUrl, setPlaying, setLoaded, setPlayed, setPlaybackRate, setPip, setDuration, setFormWidth,
    setSuggestedLabels, setSelectedLabels, setAnswerText, setQuestionText,
} = editorSlice.actions

export default editorSlice.reducer
