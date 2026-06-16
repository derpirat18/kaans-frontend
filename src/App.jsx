/**
 * App.jsx — Mapa de rutas de la aplicacion.
 *
 * Su unica responsabilidad es declarar QUE componente se muestra para
 * cada URL. No contiene logica de paginas ni interfaz propia: cada
 * pagina vive en su propio archivo dentro de src/pages.
 *
 * Esta separacion mantiene App.jsx legible aunque la app crezca: para
 * saber que rutas existen, basta leer este archivo.
 */

import { Routes, Route } from 'react-router-dom'
import PublicHome from './pages/PublicHome.jsx'
import AdminPanel from './pages/AdminPanel.jsx'

function App() {
  // <Routes> es el contenedor que decide, segun la URL actual, cual
  // <Route> mostrar. Solo se renderiza la primera ruta que coincide.
  //
  // Cada <Route> asocia un "path" (la URL) con un "element" (el
  // componente a mostrar). Para agregar una pagina nueva en el futuro,
  // se crea su componente en src/pages y se anade un <Route> aqui.
  return (
    <Routes>
      {/* Ruta publica: landing y futura lista de cursos */}
      <Route path="/" element={<PublicHome />} />

      {/* Ruta del panel de administracion (login + gestion) */}
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  )
}

export default App
