import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart-slice';

const store = configureStore({
  reducer: {
    cart: cartReducer
  },
})

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;