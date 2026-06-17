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

import { useState, useEffect } from 'react'

function AdminPanel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  // El token inicia leyendo localStorage: si habia sesion previa, nace activo.
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [usuarios, setUsuarios] = useState([])
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false)

  // Al montar: si ya habia un token guardado, cargamos los usuarios.
  useEffect(() => {
    if (token) {
      cargarUsuarios(token)
    }
  }, [])

  function cargarUsuarios(tokenActual) {
    setCargandoUsuarios(true)

    fetch('http://127.0.0.1:8000/api/usuarios', {
      headers: {
        'Authorization': `Bearer ${tokenActual}`,
      },
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los usuarios')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setUsuarios(datos)
        setCargandoUsuarios(false)
      })
      .catch(() => {
        setCargandoUsuarios(false)
      })
  }

  function manejarLogin() {
    setError(null)

    const datos = new URLSearchParams()
    datos.append('username', email)
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
        localStorage.setItem('token', datos.access_token) // persistir
        cargarUsuarios(datos.access_token)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  // Cierra sesion: borra el token persistido y limpia el estado.
  function cerrarSesion() {
    localStorage.removeItem('token')
    setToken(null)
    setUsuarios([])
  }

  if (token) {
    return (
      <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
        <h1>Panel de Administracion</h1>
        <p style={{ color: 'green' }}>Sesion iniciada correctamente.</p>

        <h2>Usuarios</h2>
        {cargandoUsuarios ? (
          <p>Cargando usuarios...</p>
        ) : (
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                <strong>{usuario.nombre}</strong> — {usuario.email} ({usuario.rol})
                {usuario.activo ? '' : ' [inactivo]'}
              </li>
            ))}
          </ul>
        )}

        <button onClick={cerrarSesion} style={{ padding: '8px 16px', marginTop: '16px' }}>
          Cerrar sesion
        </button>
      </div>
    )
  }

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