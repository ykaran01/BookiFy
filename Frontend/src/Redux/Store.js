import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './features/CartSlice'
import { CategorySlice } from './features/CategorySlice'
export const store = configureStore({
  reducer: {
    cart: CartReducer,
    category:CategorySlice.reducer,
  },
})