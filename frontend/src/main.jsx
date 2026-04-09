import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/Navbar/Navbar.css'
import './components/footer/Footer.css'
import './components/Home/MainHome.css'
import './components/Home/Register.css'
import './components/Home/FindPaper.css'
import './components/Home/PostPaper.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
