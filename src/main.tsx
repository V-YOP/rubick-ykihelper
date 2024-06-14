// mockRubick必须置于最前！
import '@/mockRubick'
import React from 'react'
import ReactDOM from 'react-dom/client'
import CodeRouter from '@/CodeRouter'
import '@/assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CodeRouter />
  </React.StrictMode>,
)
