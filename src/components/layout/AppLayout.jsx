import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function endSession() { logout(); navigate('/login', { replace: true }) }
  return (
    <div style={{ minHeight: '100vh', padding: 24, background: '#f6f8fb' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 15, padding: 20, background: 'white', borderRadius: 12, flexWrap: 'wrap' }}>
        <strong style={{ color: '#164e63' }}>MediCita · Acceso verificado</strong>
        <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to='/'>Inicio</Link><Link to='/productos'>Catálogo API</Link><Link to='/pacientes'>Pacientes</Link>
          <span>{user?.firstName} {user?.lastName}</span>
          <button type='button' onClick={endSession} style={{ border: 0, background: '#0284c7', color: 'white', borderRadius: 7, padding: '8px 13px' }}>Cerrar sesión</button>
        </nav>
      </header>
      <div style={{ marginTop: 25 }}><Outlet /></div>
    </div>
  )
}
