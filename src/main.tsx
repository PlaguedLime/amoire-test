import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import smile from './utilities/smile'
import App from './App'

declare global {
  interface Window {
    smile(): ':)'
  }
}

window.smile = () => {
  setInterval(() => {
    smile()
  })
  return ':)'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
