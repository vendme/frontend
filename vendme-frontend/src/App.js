import React, { Suspense, Component } from 'react'

import { Login, SignUp, NavBar } from './services/lazyImporter'

class App extends Component {
  render() {
    return (
      <>
        <Suspense fallback="loading...">
          <Login />
          <SignUp />
          <NavBar />
        </Suspense>
      </>
    )
  }
}

export default App
