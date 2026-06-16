import { StrictMode } from 'react' // Es un componente que se utiliza para destacar problemas potenciales en la aplicación. No renderiza nada en la interfaz de usuario, pero activa advertencias adicionales y comprobaciones de seguridad para ayudar a los desarrolladores a identificar y corregir problemas en su código.
import { createRoot } from 'react-dom/client' // Es una función que se utiliza para crear un punto de entrada para la aplicación React. Toma un elemento del DOM como argumento y devuelve un objeto raíz que se puede usar para renderizar la aplicación React en ese elemento.
import { BrowserRouter } from 'react-router-dom' // Es un componente que se conecta directamente con la barra de direcciones de tu navegador (la URL)
import App from './App.jsx' // Es el componente principal de la aplicación React. Es el punto de entrada para la aplicación y generalmente contiene la estructura general de la interfaz de usuario y la lógica de enrutamiento.
import './index.css' // Es un archivo de hoja de estilos CSS que se importa para aplicar estilos a la aplicación React. Este archivo puede contener reglas de estilo globales o específicas para los componentes de la aplicación.

createRoot(document.getElementById('root')).render( // Es el método que se utiliza para renderizar la aplicación React en el elemento del DOM especificado. En este caso, se está renderizando la aplicación dentro del elemento con el id 'root'.
  <StrictMode> // Es un componente que se utiliza para destacar problemas potenciales en la aplicación. No renderiza nada en la interfaz de usuario, pero activa advertencias adicionales y comprobaciones de seguridad para ayudar a los desarrolladores a identificar y corregir problemas en su código.
    <BrowserRouter> // Es un componente que se conecta directamente con la barra de direcciones de tu navegador (la URL) y permite que tu aplicación React maneje la navegación y el enrutamiento de manera eficiente. Proporciona una interfaz para definir rutas y manejar la navegación entre diferentes componentes de tu aplicación.
      <App /> // Es el componente principal de la aplicación React. Es el punto de entrada para la aplicación y generalmente contiene la estructura general de la interfaz de usuario y la lógica de enrutamiento.
    </BrowserRouter> // Cierra el componente BrowserRouter, indicando que el enrutamiento y la navegación se aplican a toda la aplicación.
  </StrictMode>, // Cierra el componente StrictMode, indicando que las advertencias y comprobaciones de seguridad se aplican a toda la aplicación.
)
