// src/components/AudioRecorder.jsx
import React, { useState } from 'react'

export default function AudioRecorder({ onTranscription }) {
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [interimText, setInterimText] = useState('')

  // Check for browser support
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    return <p>Your browser does not support offline speech recognition.</p>
  }

  const recognition = new SpeechRecognition()
  recognition.continuous = false // stops automatically
  recognition.interimResults = true
  recognition.lang = 'en-US' // change if needed

  recognition.onresult = (event) => {
    let transcript = ''
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript
    }
    setInterimText(transcript)
  }

  recognition.onend = () => {
    setRecording(false)
    if (interimText.trim()) {
      onTranscription(interimText.trim())
      setInterimText('')
    }
    setLoading(false)
  }

  const toggleRecording = () => {
    if (recording) {
      recognition.stop()
      setRecording(false)
      setLoading(true)
    } else {
      recognition.start()
      setRecording(true)
    }
  }

  return (
    <div className="p-4 border rounded-md bg-white shadow-md mt-4">
      <button
        onClick={toggleRecording}
        className={`px-4 py-2 rounded-lg ${
          recording ? 'bg-red-600' : 'bg-green-600'
        } text-white`}
      >
        {recording ? 'Stop Recording' : 'Record Audio'}
      </button>
      {loading && <p className="mt-2">Processing audio offline...</p>}
      {interimText && !loading && (
        <p className="mt-2 text-gray-700">Transcribed: {interimText}</p>
      )}
    </div>
  )
}
