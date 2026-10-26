import { useAuth } from '../context/AuthContext'
export default function Dashboard() {
  const { user } = useAuth()
  return <main><h1 style={{ fontSize: 28, fontWeight: 800 }}>Sesión iniciada: {user?.firstName} {user?.lastName}</h1><p>El módulo 1 ya funciona. Aquí se instalará el Dashboard del módulo 2.</p><img src={user?.image} alt="Foto del usuario desde DummyJSON" width="90" /></main>
}
