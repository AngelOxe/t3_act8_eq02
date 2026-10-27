import { LogOut, Menu, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar({ onOpenMenu }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function handleLogout() { logout(); navigate('/login', { replace: true }) }
  return (
    <header className="topbar">
      <div className="topbar-start">
        <button className="mobile-menu" onClick={onOpenMenu} aria-label="Abrir menú"><Menu size={22}/></button>
        <div><strong>Panel administrativo</strong><small>Bienvenido al sistema MediCita</small></div>
      </div>
      <div className="topbar-end">
        <span className="demo-chip"><ShieldCheck size={14}/> Modo demostración</span>
        <div className="user-profile">
          <img src={user?.image} alt={`Foto de ${user?.firstName || 'usuario'}`} />
          <span><strong>{user?.firstName} {user?.lastName}</strong><small>@{user?.username}</small></span>
        </div>
        <button type="button" className="logout-button" onClick={handleLogout}><LogOut size={17}/><span>Cerrar sesión</span></button>
      </div>
    </header>
  )
}
