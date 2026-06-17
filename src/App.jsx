/**
 * App.jsx — Mapa de rutas de la aplicacion.
 *
 * Declara que componente se muestra para cada URL. Las rutas privadas
 * se envuelven en RutaProtegida para exigir sesion.
 */

import { Routes, Route } from 'react-router-dom'
import PublicHome from './pages/PublicHome.jsx'
import Login from './pages/Login.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'

function App() {
  return (
    <Routes>
      {/* Ruta publica: landing y lista de cursos */}
      <Route path="/" element={<PublicHome />} />

      {/* Ruta de login (publica: cualquiera puede intentar entrar) */}
      <Route path="/login" element={<Login />} />

      {/* Ruta protegida: el panel solo se ve con sesion activa */}
      <Route path="/admin" element={
        <RutaProtegida>
          <AdminPanel />
        </RutaProtegida>
      } />
    </Routes>
  )
}

export default App