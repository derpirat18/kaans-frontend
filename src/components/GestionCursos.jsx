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

  // Estado del modal de edicion.
  const [cursoEditando, setCursoEditando] = useState(null)
  const [editTitulo, setEditTitulo] = useState('')
  const [editCategoria, setEditCategoria] = useState('')

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

  // Abre el modal de edicion precargando los datos del curso elegido.
  function abrirEdicion(curso) {
    setCursoEditando(curso)
    setEditTitulo(curso.titulo)
    setEditCategoria(curso.categoria)
    setError(null)
  }

  // Guarda los cambios del curso en edicion (PUT protegido) y cierra el modal.
  function guardarEdicion() {
    setError(null)
    const token = localStorage.getItem('token')

    fetch(`http://127.0.0.1:8000/api/cursos/${cursoEditando.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: editTitulo,
        categoria: editCategoria,
      }),
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron guardar los cambios')
        }
        return respuesta.json()
      })
      .then(() => {
        setCursoEditando(null) // cierra el modal
        cargarCursos()         // refresca la lista
      })
      .catch((err) => setError(err.message))
  }

  // Borra un curso (DELETE protegido) y refresca la lista.
  function borrarCurso(slugABorrar) {
    setError(null)
    const token = localStorage.getItem('token')

    fetch(`http://127.0.0.1:8000/api/cursos/${slugABorrar}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo borrar el curso')
        }
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
          <li key={curso.id} style={{ marginBottom: '6px' }}>
            <strong>{curso.titulo}</strong> — {curso.categoria}{' '}
            <span style={{ color: '#888' }}>({curso.slug})</span>{' '}
            <button onClick={() => abrirEdicion(curso)} style={{ marginLeft: '8px' }}>
              Editar
            </button>{' '}
            <button onClick={() => borrarCurso(curso.slug)}>
              Borrar
            </button>
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

      {/* ← AQUÍ va el modal, después de cerrar el div del formulario */}
      {cursoEditando && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%',
          }}>
            <h3>Editar curso</h3>
            <p style={{ color: '#888' }}>Slug: {cursoEditando.slug}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                placeholder="titulo"
                value={editTitulo}
                onChange={(e) => setEditTitulo(e.target.value)}
                style={{ padding: '8px' }}
              />
              <input
                placeholder="categoria"
                value={editCategoria}
                onChange={(e) => setEditCategoria(e.target.value)}
                style={{ padding: '8px' }}
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={guardarEdicion} style={{ padding: '8px 16px' }}>
                  Guardar
                </button>
                <button onClick={() => setCursoEditando(null)} style={{ padding: '8px 16px' }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default GestionCursos