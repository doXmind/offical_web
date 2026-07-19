import { useEffect } from 'react'
import Home from './pages/Home.jsx'

export default function App() {
  useEffect(() => {
    if (window.location.pathname.replace(/\/+$/, '') !== '/download') return

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('download')?.scrollIntoView()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return <Home />
}
