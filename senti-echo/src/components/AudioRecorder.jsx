// src/components/AudioRecorder.jsx
import React, { useState } from 'react'

export default function AudioRecorder({ onTranscription }) {
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(false)

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
    // Send interim results directly to parent
    onTranscription(transcript, true)
  }

  recognition.onend = () => {
    setRecording(false)
    setLoading(false)
    // Finalize transcription
    onTranscription('', false, true)
  }

  const toggleRecording = () => {
    if (recording) {
      recognition.stop()
      setRecording(false)
      setLoading(true)
    } else {
      recognition.start()
      setRecording(true)
      // Clear any previous interim text when starting new recording
      onTranscription('', true)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleRecording}
      disabled={loading}
      className={`p-2 rounded-full ${
        recording 
          ? 'bg-red-500 text-white animate-pulse' 
          : loading 
            ? 'bg-gray-400 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      title={recording ? 'Stop recording' : 'Start voice recording'}
    >
      {loading ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : recording ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6h12v12H6z"/>
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
        </svg>
      )}
    </button>
  )
}