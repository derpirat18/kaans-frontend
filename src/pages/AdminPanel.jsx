/**
 * AdminPanel.jsx — Panel de administracion.
 *
 * Pagina privada desde donde el equipo gestionara cursos, usuarios y
 * temario. Por ahora es un placeholder; mas adelante incluira:
 *   1. Un formulario de login contra POST /api/auth/login.
 *   2. El guardado del token JWT recibido.
 *   3. La gestion (crear/editar) usando ese token en las peticiones
 *      protegidas del backend.
 *
 * Mas adelante esta ruta debera protegerse para que solo usuarios
 * autenticados puedan verla (se hara cuando exista el login).
 */

import { useState } from 'react'

function AdminPanel() {
  // Cajas de memoria del formulario y la sesion.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  // Se ejecuta al hacer clic en "Entrar": envia las credenciales
  // al backend como datos de formulario (lo que espera OAuth2).
  function manejarLogin() {
    setError(null)

    const datos = new URLSearchParams()
    datos.append('username', email) // el backend llama "username" al email
    datos.append('password', password)

    fetch('http://127.0.0.1:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: datos,
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Credenciales invalidas')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setToken(datos.access_token)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  // Si ya hay sesion, mostramos el interior del panel.
  if (token) {
    return (
      <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
        <h1>Panel de Administracion</h1>
        <p style={{ color: 'green' }}>Sesion iniciada correctamente.</p>
        <p>Aqui ira la gestion de cursos y usuarios.</p>
      </div>
    )
  }

  // Si no hay sesion, mostramos el formulario de login.
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '360px' }}>
      <h1>Acceso al Panel</h1>

      <div style={{ marginBottom: '12px' }}>
        <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>Contrasena</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={manejarLogin} style={{ padding: '8px 16px' }}>
        Entrar
      </button>
    </div>
  )
}

export default AdminPanel