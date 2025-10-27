import React, { useState, useEffect } from 'react'
import localforage from 'localforage'
import EntryList from './EntryList'
import AudioRecorder from './AudioRecorder'

export default function JournalEntry() {
  const [text, setText] = useState('')
  const [entries, setEntries] = useState([])

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

  const handleAudioTranscription = async (transcribedText) => {
    const newEntry = { text: transcribedText, date: new Date().toISOString() }
    const updated = [newEntry, ...entries]
    setEntries(updated)
    await localforage.setItem('entries', updated)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Your Journal</h2>

      {/* Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full border rounded-md p-3 mb-2"
      />
      <button
        onClick={handleSaveText}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Save Text Entry
      </button>

      {/* Live Audio Recording */}
      <AudioRecorder onTranscription={handleAudioTranscription} />

      {/* Entries */}
      <EntryList entries={entries} />
    </div>
  )
}
