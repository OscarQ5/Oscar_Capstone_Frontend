import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '../Styles/SpeechToText.css'

const SpeechToText = ({ onTextChange, handleEmergencySend, cancelButton }) => {
    const [transcription, setTranscription] = useState('')

    const handleSpeechRecognition = () => {
        const recognition = new window.webkitSpeechRecognition()
        recognition.lang = 'en-US'
        recognition.start()

        recognition.onresult = event => {
            console.log(event.results)
            const transcript = event.results[0][0].transcript
            setTranscription(transcript)
            onTextChange(transcript)
        }
    }

    const handleChange = event => {
        setTranscription(event.target.value)
        onTextChange(event.target.value)
    }

    const { t } = useTranslation();

    return (
        <div className='textBoxBody'>
            <div className="inputAndButton">
                <textarea
                    className='textbox'
                    placeholder={t('speechToText.placeholder')}
                    cols="60"
                    rows="7"
                    value={transcription}
                    onChange={handleChange}
                >
                </textarea>
                <div className='textButtons'>
                    <button className='micro' onClick={handleSpeechRecognition} >
                        🎤
                    </button>
                    <button className="send" onClick={handleEmergencySend} >
                        Send
                    </button>
                    <button className='cancelSend' onClick={cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SpeechToText