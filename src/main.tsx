import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// index.css が邪魔をしている可能性があるので、一旦コメントアウトか削除します
// import './index.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)