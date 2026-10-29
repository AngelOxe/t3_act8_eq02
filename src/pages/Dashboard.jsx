import { ArrowRight, CalendarCheck2, CalendarClock, ChartNoAxesColumnIncreasing, UsersRound, TableProperties, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const stats = [
  { label: 'Citas programadas', value: '12', icon: CalendarClock, tone: 'cyan', note: 'Dato ilustrativo' },
  { label: 'Pacientes registrados', value: '48', icon: UsersRound, tone: 'blue', note: 'Dato ilustrativo' },
  { label: 'Citas completadas', value: '8', icon: CalendarCheck2, tone: 'mint', note: 'Dato ilustrativo' },
  { label: 'Ocupación estimada', value: '67%', icon: ChartNoAxesColumnIncreasing, tone: 'violet', note: 'Dato ilustrativo' },
]
const mockAppointments = [
  { patient: 'María Hernández', service: 'Consulta general', hour: '09:00', status: 'Confirmada' },
  { patient: 'Carlos García', service: 'Seguimiento', hour: '10:30', status: 'Confirmada' },
  { patient: 'Ana López', service: 'Consulta general', hour: '12:00', status: 'Completada' },
]

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <section className="page-stack">
      <div className="dashboard-welcome">
        <div><span className="eyebrow">RESUMEN GENERAL</span><h1>¡Hola, {user?.firstName}!</h1><p>Este es el resumen visual de tu consultorio MediCita ejemplo.</p></div>
        <div className="welcome-seal"><ShieldCheck size={18}/> Sesión verificada con DummyJSON</div>
      </div>
      <div className="demo-warning">Los indicadores y las citas de este dashboard son datos ficticios para la presentación académica; el login sí utiliza una API real.</div>
      <div className="stats-grid">{stats.map(({label,value,icon:Icon,tone,note})=>(
        <article className="stat-card" key={label}><span className={`stat-icon stat-icon--${tone}`}><Icon size={22}/></span><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><small>{note}</small></article>
      ))}</div>
      <div className="dashboard-columns">
        <article className="panel-card"><div className="panel-heading"><div><h2>Próximas citas</h2><p>Vista de ejemplo para MediCita</p></div><span className="small-tag">Simulación</span></div>
          <div className="table-scroll"><table className="simple-table"><thead><tr><th>Paciente</th><th>Servicio</th><th>Hora</th><th>Estado</th></tr></thead><tbody>{mockAppointments.map(item=>(<tr key={item.patient}><td>{item.patient}</td><td>{item.service}</td><td>{item.hour}</td><td><span className={`status-pill ${item.status === 'Completada' ? 'status-pill--done':''}`}>{item.status}</span></td></tr>))}</tbody></table></div>
        </article>
        <article className="panel-card quick-panel"><div className="panel-heading"><div><h2>Acceso rápido</h2><p>Actividad 8 · Prueba de API</p></div></div><span className="quick-icon"><TableProperties size={30}/></span><h3>Catálogo de prueba</h3><p>Tu compañero integrará la tabla de productos, los filtros y las operaciones CRUD en esta sección.</p><Link to="/productos" className="primary-button quick-link">Ir al catálogo <ArrowRight size={17}/></Link></article>
      </div>
    </section>
  )
}
