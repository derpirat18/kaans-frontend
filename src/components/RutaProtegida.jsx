/**
 * RutaProtegida — Guardian de rutas privadas.
 *
 * Envuelve a cualquier pagina que requiera sesion. Si hay token
 * guardado, muestra el contenido (children). Si no, redirige al login.
 * Asi la logica de proteccion se define una vez y se reutiliza.
 */

import { Navigate } from 'react-router-dom'

function RutaProtegida({ children }) {
  // Leemos el token directamente de localStorage (la fuente de verdad
  // de la sesion persistida).
  const token = localStorage.getItem('token')

  // Si no hay token, redirigimos al login y no mostramos el contenido.
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Si hay token, dejamos ver el contenido protegido.
  return children
}

export default RutaProtegida