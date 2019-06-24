import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import App from './App'
import Firebase, { FirebaseContext } from './components/Firebase'

import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <HashRouter>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </HashRouter>
  </BrowserRouter>,
  document.getElementById('root')
)
