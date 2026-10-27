import { CalendarClock, UsersRound } from 'lucide-react'

export default function DemoSection({ section }) {
  const isPatients = section === 'pacientes'
  const Icon = isPatients ? UsersRound : CalendarClock
  return (
    <section className="page-stack">
      <div className="page-heading"><span className="eyebrow">MEDICITA · VISTA DE DEMOSTRACIÓN</span><h1>{isPatients ? 'Pacientes' : 'Horarios'}</h1><p>Sección de navegación simulada según los requisitos de la Actividad 8.</p></div>
      <div className="empty-module"><span className="empty-module__icon"><Icon size={34}/></span><h2>{isPatients ? 'Administración de pacientes' : 'Administración de horarios'}</h2><p>Este módulo pertenece al proyecto completo MediCita y no forma parte del CRUD solicitado sobre la API de terceros.</p></div>
    </section>
  )
}
