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

function AdminPanel() {
  return (
    <div
      style={{
        padding: '24px',
        margin: '24px',
        border: '2px solid #7f77dd',
        borderRadius: '8px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Panel de Administracion</h1>
      <p>Aqui iran el login y la gestion de cursos y usuarios.</p>

      {/*
        TODO (siguientes pasos):
        - Construir el formulario de login (email + password).
        - Llamar a POST /api/auth/login y guardar el token JWT.
        - Mostrar la gestion solo si hay token valido.
      */}
    </div>
  )
}

export default AdminPanel
