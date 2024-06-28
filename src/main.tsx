import React from 'react'
import ReactDOM from 'react-dom/client'
import perspectiveWorker from "./perspectiveWorker";

import App from './App'
import './index.css'

console.log("Created perspective worker", perspectiveWorker);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
