/**
 * Login — Pagina de inicio de sesion.
 *
 * Su unica responsabilidad: autenticar contra el backend, guardar el
 * token en localStorage y redirigir al panel. No contiene logica de
 * gestion (eso vive en AdminPanel).
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  // useNavigate nos da una funcion para redirigir por codigo
  // (no por clic en un enlace), util tras un login exitoso.
  const navigate = useNavigate()

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
        localStorage.setItem('token', datos.access_token)
        navigate('/admin') // redirige al panel tras login exitoso
      })
      .catch((err) => {
        setError(err.message)
      })
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

export default Login