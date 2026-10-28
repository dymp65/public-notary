import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Root from './Root.tsx'
import { LocaleProvider } from './i18n/LocaleProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <Root />
    </LocaleProvider>
  </StrictMode>,
)
