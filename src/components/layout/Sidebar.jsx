import { CalendarDays, Clock3, LayoutDashboard, TableProperties, UsersRound, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/productos', label: 'Catálogo API', icon: TableProperties },
  { to: '/pacientes', label: 'Pacientes', icon: UsersRound },
  { to: '/horarios', label: 'Horarios', icon: Clock3 },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-overlay" aria-label="Cerrar menú" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar-logo"><span className="brand-icon"><CalendarDays size={19}/></span><span>MediCita</span><button className="mobile-close" onClick={onClose} aria-label="Cerrar menú"><X size={19}/></button></div>
        <div className="sidebar-section-label">MENÚ PRINCIPAL</div>
        <nav aria-label="Navegación principal" className="sidebar-nav">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose} className={({isActive})=>`nav-link ${isActive ? 'nav-link--active' : ''}`}>
              <Icon size={19}/><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom"><div className="sidebar-bottom-icon"><HeartIcon/></div><strong>Gestión simplificada</strong><span>Actividad 8 · Equipo 02</span></div>
      </aside>
    </>
  )
}

function HeartIcon() { return <CalendarDays size={19}/> }
