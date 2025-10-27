import localforage from 'localforage'

export const saveEntry = async (text) => {
  const entries = (await localforage.getItem('entries')) || []
  entries.push({ text, date: new Date().toISOString() })
  await localforage.setItem('entries', entries)
}

export const getEntries = async () => {
  return (await localforage.getItem('entries')) || []
}
