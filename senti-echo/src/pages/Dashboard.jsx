import MoodChart from '../components/MoodChart'

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Senti-Echo Dashboard</h1>
      <MoodChart />
    </div>
  )
}
