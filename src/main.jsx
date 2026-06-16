/**
 * main.jsx — Punto de entrada de la aplicacion.
 *
 * Este archivo se ejecuta una sola vez al cargar la pagina. Su unica
 * responsabilidad es "montar" la aplicacion React dentro del HTML.
 * Rara vez se modifica una vez configurado.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// createRoot toma el <div id="root"> que vive en index.html y lo convierte
// en el contenedor donde React dibujara toda la interfaz.
//
// Envolvemos <App /> en dos componentes, de afuera hacia adentro:
//   - StrictMode: solo en desarrollo, activa verificaciones extra que
//     ayudan a detectar errores comunes. No renderiza nada visible ni
//     afecta a produccion.
//   - BrowserRouter: habilita el enrutamiento basado en la URL del
//     navegador. Debe envolver a toda la app para que cualquier
//     componente pueda definir rutas o navegar entre ellas.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
