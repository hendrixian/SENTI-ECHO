// src/components/JournalEntry.jsx
import React, { useState, useEffect } from 'react'
import localforage from 'localforage'
import EntryList from './EntryList'
import AudioRecorder from './AudioRecorder'

export default function JournalEntry() {
  const [text, setText] = useState('')
  const [entries, setEntries] = useState([])
  const [isInterim, setIsInterim] = useState(false)

  useEffect(() => {
    const fetchEntries = async () => {
      const saved = await localforage.getItem('entries')
      setEntries(saved || [])
    }
    fetchEntries()
  }, [])

  const handleSaveText = async () => {
    if (!text.trim()) return
    const newEntry = { text, date: new Date().toISOString() }
    const updated = [newEntry, ...entries]
    setEntries(updated)
    await localforage.setItem('entries', updated)
    setText('')
  }

  const handleAudioTranscription = (transcribedText, interim = false, final = false) => {
    if (interim && !final) {
      // This is interim text, update the textarea
      setText(transcribedText)
      setIsInterim(true)
    } else if (final) {
      // This is the final transcription, clear interim state
      setIsInterim(false)
      // If we have text and it's not just whitespace, save it
      if (text.trim()) {
        handleSaveText()
      }
    } else if (!interim) {
      // Starting new recording, clear the text
      setText('')
      setIsInterim(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Your Journal</h2>

      {/* Text Input with Mic Icon */}
      <div className="relative mb-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setIsInterim(false)
          }}
          placeholder="Write your thoughts or click the mic to speak..."
          className="w-full border rounded-md p-3 pr-12 resize-none"
          rows="4"
        />
        <div className="absolute right-2 top-2">
          <AudioRecorder onTranscription={handleAudioTranscription} />
        </div>
        {isInterim && (
          <div className="absolute bottom-2 left-3 text-xs text-blue-600 font-medium">
            Listening...
          </div>
        )}
      </div>

      <button
        onClick={handleSaveText}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4 transition-colors duration-200"
      >
        Save Entry
      </button>

      {/* Entries */}
      <EntryList entries={entries} />
    </div>
  )
}