import React from 'react'
import Navigation from './Router/Navigation'
import { Provider } from 'react-redux'
import store from './app/store'
import { StripeProvider } from '@stripe/stripe-react-native'

const App = () => {
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  return (
    <Provider store={store}>
      <StripeProvider publishableKey='pk_test_51OqIQuSDqukMkl4kq88ydPTEkWD74FGPZTHuLJLFcqPRERdrJFMRQ27ofQEXWoM3reoe2iiNPhCEAFa1wnuotFve00uWTjcom4'>
      <Navigation />
      </StripeProvider>
    </Provider>
  )
}

export default App