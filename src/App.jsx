import { Activity, CalendarDays } from 'lucide-react'

export default function App() {
  return (
    <main className="starter-screen">
      <div className="starter-brand"><CalendarDays size={25} /> MediCita</div>
      <h1>Actividad 8 · Equipo 02</h1>
      <p>Base lista. Aquí integraremos primero el login y luego el dashboard.</p>
      <div className="starter-note"><Activity size={18} /> React + Vite + Tailwind + Router</div>
    </main>
  )
}
