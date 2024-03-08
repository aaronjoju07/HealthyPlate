import React from 'react'
import Navigation from './Router/Navigation'
import { Provider } from 'react-redux'
import store from './app/store'
import { StripeProvider } from '@stripe/stripe-react-native'

const App = () => {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
      <Navigation />
      </StripeProvider>
    </Provider>
  )
}

export default App