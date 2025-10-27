import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { getEntries } from '../utils/journalStorage'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function MoodChart() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const fetchEntries = async () => {
      const saved = await getEntries()
      setEntries(saved || [])
    }
    fetchEntries()
  }, [])

  // Only render chart when there’s data
  if (!entries || entries.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-white rounded-xl shadow-md">
        No mood data yet — add some journal entries!
      </div>
    )
  }

  // Safely process chart data
  const labels = entries
    .map(e => e.date ? new Date(e.date).toLocaleDateString() : 'Unknown')
  const scores = entries
    .map(e => (e.text ? e.text.length % 10 + 1 : 0))

  const data = {
    labels,
    datasets: [
      {
        label: 'Mood Score',
        data: scores,
        borderColor: 'rgb(34,197,94)',
        backgroundColor: 'rgba(34,197,94,0.4)',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Mood / Emotion Trend' },
    },
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <Line data={data} options={options} />
    </div>
  )
}
