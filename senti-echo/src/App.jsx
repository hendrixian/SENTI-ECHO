import Dashboard from './pages/Dashboard'
import JournalEntry from './components/JournalEntry'

export default function App() {
  return (
    
    <div className="min-h-screen bg-gray-100">
      <JournalEntry />
      <Dashboard />
    </div>
  )
}
