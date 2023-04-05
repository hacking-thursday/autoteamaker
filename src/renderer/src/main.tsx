import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material'

import App from './App'
import { TerminalContextProvider } from './contexts/TerminalContext'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TerminalContextProvider>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </TerminalContextProvider>
  </React.StrictMode>,
)
