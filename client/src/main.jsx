import React from 'react'
import ReactDOM from 'react-dom/client'
import ChampionsApp from './ChampionsApp.jsx'
import './css/index.css'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './Redux/store.js';
import axios from 'axios'

axios.defaults.baseURL="http://localhost:3001/"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ChampionsApp />
      </React.StrictMode>,
    </BrowserRouter>
  </Provider>
)
