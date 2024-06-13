// mockRubick必须置于最前！
import './mockRubick'
import React from 'react'
import ReactDOM from 'react-dom/client'
import CodeRouter from './CodeRouter.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CodeRouter />
  </React.StrictMode>,
)

window.api.whenOut().then(() => {
  window.rubick.showNotification('me go')
})