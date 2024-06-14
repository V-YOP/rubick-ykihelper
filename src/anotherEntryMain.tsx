
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <p>nihao</p>
    <button onClick={() => window.close()}>close me</button>
  </React.StrictMode>,
)
