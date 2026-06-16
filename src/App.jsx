import { Routes, Route } from 'react-router-dom' // Son componentes que se utilizan para definir las rutas de la aplicación React. Routes es un contenedor para todas las rutas, y Route se utiliza para definir cada ruta individualmente, especificando el path (ruta) y el elemento (componente) que se renderizará cuando se acceda a esa ruta.

function App() { // Es el componente principal de la aplicación React. Es el punto de entrada para la aplicación y generalmente contiene la estructura general de la interfaz de usuario y la lógica de enrutamiento.
  return (
    <Routes>
      {/* Ruta pública (Landing / Lista de cursos) */}
      <Route path="/" element={
        <div style={{ padding: '20px' }}>
          <h1>Kaans Público</h1>
          <p>Aquí listaremos los cursos conectando con el backend.</p>
        </div>
      } />

      {/* Ruta protegida (Panel de Admin) */}
      <Route path="/admin" element={
        <div style={{ padding: '20px', border: '2px solid #7f77dd' }}>
          <h1>Panel de Administración</h1>
          <p>Aquí irá el login y la gestión.</p>
        </div>
      } />
    </Routes>
  )
}

export default App // Es la exportación del componente App, lo que permite que otros archivos importen y utilicen este componente en la aplicación React.