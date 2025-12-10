import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const htmlElement = document.documentElement
htmlElement.setAttribute('lang', 'es')
htmlElement.setAttribute('translate', 'no')
htmlElement.classList.add('notranslate')

const bodyElement = document.body
bodyElement.setAttribute('translate', 'no')
bodyElement.classList.add('notranslate')

const rootElement = document.getElementById('root')!
rootElement.setAttribute('translate', 'no')
rootElement.classList.add('notranslate')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
