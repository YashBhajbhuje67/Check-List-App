import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios';
axios.defaults.baseURL = 'https://check-list-app-coral.vercel.app/';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
