import React from 'react'
import Navigation from './Router/Navigation'
import { Provider } from 'react-redux'
import store from './app/store'

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App