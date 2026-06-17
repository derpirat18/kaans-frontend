/**
 * AdminPanel — Panel de administracion (privado).
 *
 * Asume que ya hay sesion (lo garantiza RutaProtegida). Su trabajo es
 * la gestion: por ahora, listar usuarios. Mas adelante, gestionar
 * cursos, temario, etc.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([])
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true)

  const navigate = useNavigate()

  // Al montar, cargamos los usuarios usando el token persistido.
  useEffect(() => {
    const token = localStorage.getItem('token')
    setCargandoUsuarios(true)

    fetch('http://127.0.0.1:8000/api/usuarios', {
      headers: {
        'Authorization': `Bearer ${token}`,
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
  }, [])

  // Cierra sesion: borra el token y manda al login.
  function cerrarSesion() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Panel de Administracion</h1>

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

export default AdminPanel