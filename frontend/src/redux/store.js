import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-slice';
import cartReducer from './cart-slice';
import uiSlice from './ui-slice';


const combinedReducer = combineReducers({
    cart : cartReducer,
    ui   : uiSlice,
    auth : authSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer
});

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;