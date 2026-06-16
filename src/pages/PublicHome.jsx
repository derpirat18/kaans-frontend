/**
 * PublicHome.jsx — Pagina publica (landing).
 *
 * Es la pagina que vera cualquier visitante sin necesidad de iniciar
 * sesion. Por ahora es un placeholder; mas adelante mostrara la lista
 * de cursos consumiendo el endpoint publico GET /api/cursos del backend.
 *
 * Un "componente" en React es una funcion que devuelve la interfaz
 * (JSX) que debe mostrarse en pantalla.
 */

import { useState, useEffect } from 'react'

function PublicHome() {
  // Tres cajas de memoria para los tres estados de la peticion.
  const [cursos, setCursos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Al montar el componente (una sola vez, por el [] final),
  // pedimos los cursos al backend.
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cursos')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los cursos')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setCursos(datos)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  // Estado 1: cargando
  if (cargando) {
    return <p style={{ padding: '24px' }}>Cargando cursos...</p>
  }

  // Estado 2: error
  if (error) {
    return <p style={{ padding: '24px', color: 'red' }}>Error: {error}</p>
  }

  // Estado 3: exito, mostramos la lista
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Kaans</h1>
      <p>Cursos disponibles:</p>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            <strong>{curso.titulo}</strong> — {curso.categoria}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PublicHome
