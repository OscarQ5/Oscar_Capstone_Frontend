import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const SpeechToText = ({ onTextChange }) => {
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
        <div>
            <input
                className='textbox'
                placeholder={t('speechToText.placeholder')}
                type="text"
                value={transcription}
                onChange={handleChange}
            />
            <button className='micro' onClick={handleSpeechRecognition}>
                🎤
            </button>
        </div>
    )
}

export default SpeechToText