import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-slice';
import cartReducer from './cart-slice';
import uiSlice from './ui-slice';


const store = configureStore({
  reducer: {
    cart : cartReducer,
    ui   : uiSlice,
    auth : authSlice
  }
});

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState().cart))
});

export default store;