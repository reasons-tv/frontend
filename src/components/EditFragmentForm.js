import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ReactTags } from 'react-tag-autocomplete'

import { setFormWidth, setQuestionText, setAnswerText, setSelectedLabels, setSuggestedLabels, submitFragment } from '../features/editor/editorSlice'
import { formatTime } from '../utils'

export default function EditFragmentForm({
    height = 400,
    marginTop = 20,
    marginRight = 10,
    marginBottom = 30,
    marginLeft = 40
}) {
    const qText = useSelector((state) => state.editor.questionText)
    const aText = useSelector((state) => state.editor.answerText)
    const selectedLabels = useSelector((state) => state.editor.selectedLabels)
    const suggestedLabels = useSelector((state) => state.editor.suggestedLabels)
    const dispatch = useDispatch();
    useEffect(() => {
        const handleResize = () => { dispatch(setFormWidth(window.innerWidth * 0.9)) };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <form className='edit-fragment-form' onSubmit={(e) => { e.preventDefault(); dispatch(submitFragment()) }}>
            <label>
                Question Text:
                <input
                    type="text"
                    value={qText}
                    onChange={(e) => dispatch(setQuestionText(e.target.value))}
                />
            </label>
            <br />
            <label>
                Answer Text:
                <input
                    type="text"
                    value={aText}
                    onChange={(e) => dispatch(setAnswerText(e.target.value))}
                />
            </label>
            <br />
            <ReactTags
                labelText="Common labels"
                selected={selectedLabels}
                suggestions={suggestedLabels}
                onAdd={(newTag) => dispatch(setSelectedLabels([...selectedLabels, newTag]))}
                onDelete={(tagIndex) => dispatch(setSelectedLabels(selectedLabels.filter((_, i) => i !== tagIndex)))}
                noOptionsText="No matching labels"
            />
            <br />
            <button type="submit" style={{ 'width': '48px' }}>Submit Fragment</button>
        </form>
    );
}
