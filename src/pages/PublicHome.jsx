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

function PublicHome() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Kaans</h1>
      <p>Plataforma educativa. Aqui se mostrara la lista de cursos.</p>

      {/*
        TODO (siguiente paso): consumir GET /api/cursos del backend
        (http://127.0.0.1:8000/api/cursos) y renderizar las tarjetas
        de cursos de forma dinamica en lugar de este texto.
      */}
    </div>
  )
}

export default PublicHome
