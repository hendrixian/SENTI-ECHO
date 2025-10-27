// EntryList.jsx
export default function EntryList({ entries }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Saved Entries</h3>
      {entries.length === 0 && <p>No entries yet.</p>}
      <ul>
        {entries.map((entry, index) => (
          <li key={index} className="mb-2 p-2 border rounded-md">
            <p>{entry.text}</p>
            <small className="text-gray-500">
              {new Date(entry.date).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  )
}
