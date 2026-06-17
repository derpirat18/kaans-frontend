/**
 * GestionCursos — Listado y creacion de cursos (panel admin).
 *
 * Lista los cursos (GET publico) y permite crear nuevos (POST protegido
 * con token). Tras crear, refresca la lista. Editar y borrar se anaden
 * en un paso posterior.
 */

import { useState, useEffect } from 'react'

function GestionCursos() {
  const [cursos, setCursos] = useState([])
  const [error, setError] = useState(null)

  // Campos del formulario de creacion (inputs controlados).
  const [slug, setSlug] = useState('')
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState('')

  // Carga la lista de cursos desde el backend (endpoint publico).
  function cargarCursos() {
    fetch('http://127.0.0.1:8000/api/cursos')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los cursos')
        }
        return respuesta.json()
      })
      .then((datos) => setCursos(datos))
      .catch((err) => setError(err.message))
  }

  // Al montar, cargamos los cursos una vez.
  useEffect(() => {
    cargarCursos()
  }, [])

  // Crea un curso nuevo (POST protegido) y refresca la lista.
  function crearCurso() {
    setError(null)
    const token = localStorage.getItem('token')

    fetch('http://127.0.0.1:8000/api/cursos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        slug: slug,
        titulo: titulo,
        categoria: categoria,
      }),
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo crear el curso (revisa que el slug no exista)')
        }
        return respuesta.json()
      })
      .then(() => {
        setSlug('')
        setTitulo('')
        setCategoria('')
        cargarCursos()
      })
      .catch((err) => setError(err.message))
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <h2>Cursos</h2>

      {/* Lista de cursos existentes */}
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            <strong>{curso.titulo}</strong> — {curso.categoria}{' '}
            <span style={{ color: '#888' }}>({curso.slug})</span>
          </li>
        ))}
      </ul>

      {/* Formulario de creacion */}
      <h3>Crear curso nuevo</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '360px' }}>
        <input
          placeholder="slug (ej. marketing-digital)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          placeholder="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          placeholder="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ padding: '8px' }}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={crearCurso} style={{ padding: '8px 16px' }}>
          Crear curso
        </button>
      </div>
    </div>
  )
}

export default GestionCursos