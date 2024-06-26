import React from 'react'
import ReactDOM from 'react-dom/client'
import ChampionsApp from './ChampionsApp.jsx'
import './css/index.css'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <ChampionsApp />
    </React.StrictMode>,
  </BrowserRouter>
  
)
