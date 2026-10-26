import { Database, TableProperties } from 'lucide-react'

// CONTRATO DE INTEGRACIÓN: Integrante 2 reemplaza ÚNICAMENTE este archivo
// y sus propios componentes/services. Exportación predeterminada obligatoria.
export default function Products() {
  return (
    <section className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">API EXTERNA · DUMMYJSON</span>
        <h1>Catálogo de prueba</h1>
        <p>Aquí se integrará el módulo de tabla, filtros, paginación y CRUD.</p>
      </div>
      <div className="empty-module">
        <span className="empty-module__icon"><TableProperties size={32} /></span>
        <h2>Espacio reservado para el integrante 2</h2>
        <p>El archivo <code>src/pages/Products.jsx</code> se reemplazará cuando su rama esté lista.</p>
        <p className="inline-note"><Database size={15}/> API: https://dummyjson.com/products</p>
      </div>
    </section>
  )
}
