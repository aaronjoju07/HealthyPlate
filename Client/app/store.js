import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducer/User/userSlice'
import cartReducer from '../reducer/cart/cartSlice.js'

export default configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }
})