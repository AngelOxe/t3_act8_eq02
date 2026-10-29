import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CalendarDays, CheckCircle2, Eye, EyeOff, HeartPulse, LockKeyhole, Mail, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const REMEMBER_KEY = 'medicita_act8_remember_username'

export default function Login() {
  const { login, isAuthenticated, checking } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [identifier, setIdentifier] = useState(() => localStorage.getItem(REMEMBER_KEY) || '')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => Boolean(localStorage.getItem(REMEMBER_KEY)))
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [help, setHelp] = useState('')

  if (checking) return <div className="app-loader" role="status">Verificando sesión...</div>
  if (isAuthenticated) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setHelp('')
    if (!identifier.trim() && !password) {
      setError('Ingresa tu usuario o correo electrónico y tu contraseña.')
      return
    }
    if (!identifier.trim()) { setError('El campo de usuario o correo es obligatorio.'); return }
    if (!password) { setError('La contraseña es obligatoria.'); return }

    setLoading(true)
    try {
      await login(identifier.trim(), password)
      if (remember) localStorage.setItem(REMEMBER_KEY, identifier.trim())
      else localStorage.removeItem(REMEMBER_KEY)
      const target = location.state?.from
      const redirect = target ? `${target.pathname}${target.search || ''}` : '/'
      navigate(redirect, { replace: true })
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  function useDemoUser() {
    setIdentifier('emilys')
    setPassword('emilyspass')
    setError('')
    setHelp('Credenciales de prueba cargadas. Pulsa Iniciar sesión para llamar a la API.')
  }

  return (
    <main className="login-screen">
      <section className="login-left" aria-label="Acceso al sistema">
        <div className="login-brand"><span className="brand-icon"><CalendarDays size={20}/></span> MediCita</div>
        <div className="login-center">
          <div className="login-form-wrap">
            <span className="login-eyebrow">SISTEMA DE GESTIÓN MÉDICA CAMBIO</span>
            <h1>Bienvenido a MediCita</h1>
            <p className="login-subtitle">Inicia sesión para administrar tu consultorio</p>
            <form onSubmit={handleSubmit} noValidate>
              <label className="form-label" htmlFor="identifier">Usuario o correo electrónico</label>
              <div className="field-icon-wrap">
                <Mail size={18} className="field-icon" aria-hidden="true" />
                <input id="identifier" name="identifier" type="text" value={identifier}
                  onChange={e => setIdentifier(e.target.value)} placeholder="emilys o correo de DummyJSON"
                  autoComplete="username" aria-invalid={Boolean(error && !identifier.trim())} disabled={loading} />
              </div>
              <label className="form-label second-label" htmlFor="password">Contraseña</label>
              <div className="field-icon-wrap">
                <LockKeyhole size={18} className="field-icon" aria-hidden="true" />
                <input id="password" name="password" type={showPassword ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña"
                  autoComplete="current-password" disabled={loading} aria-invalid={Boolean(error && !password)}/>
                <button className="eye-toggle" type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
              <div className="login-options">
                <label className="remember-label">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Recordar usuario
                </label>
                <button type="button" className="text-button" onClick={() => setHelp('Esta práctica utiliza cuentas de prueba de DummyJSON y no permite restablecer contraseñas.')}>¿Olvidaste tu contraseña?</button>
              </div>
              {error && <div className="form-alert error-alert" role="alert">{error}</div>}
              {help && <div className="form-alert help-alert" role="status">{help}</div>}
              <button type="submit" disabled={loading} className="primary-button login-submit">
                {loading ? 'Verificando credenciales...' : <>Iniciar sesión <ArrowRight size={17}/></>}
              </button>
            </form>
            <button type="button" className="demo-credentials" onClick={useDemoUser} disabled={loading}>Usar credenciales de prueba: emilys / emilyspass</button>
            <p className="secure-note"><ShieldCheck size={15}/> Acceso simulado para una actividad académica</p>
          </div>
        </div>
        <footer className="login-footer">MediCita © 2026 · Equipo 02</footer>
      </section>
      <aside className="login-right" aria-label="Presentación de MediCita">
        <div className="hero-orbit hero-orbit-one"/>
        <div className="hero-orbit hero-orbit-two"/>
        <span className="hero-label"><HeartPulse size={13}/> HECHO PARA TU CONSULTORIO</span>
        <div className="hero-visual">
          {/*<img src={`${import.meta.env.BASE_URL}images/doctor-figma-preview.jpg`} alt="Médico en un consultorio con tableta" />*/}
          <div className="appointment-popover">
            <span className="appointment-icon"><CalendarDays size={19}/></span>
            <span><strong>Tu agenda, al día</strong><small>Miércoles, 21 de octubre</small><em><i/> 12 citas para hoy <b>09:00</b></em></span>
          </div>
        </div>
        <div className="hero-copy">
          <h2>Tu consultorio, mejor organizado</h2>
          <p>Gestiona citas, pacientes y horarios desde un solo lugar.</p>
        </div>
        <p className="hero-footer"><HeartPulse size={15}/> Más tiempo para lo que importa: tus pacientes.</p>
      </aside>
    </main>
  )
}
