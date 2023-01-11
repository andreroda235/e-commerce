import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './auth-slice';
import cartReducer from './cart-slice';
import uiReducer from './ui-slice';


const combinedReducer = combineReducers({
    cart : cartReducer,
    ui   : uiReducer,
    auth : authReducer
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
  /* console.log('saving... ' + JSON.stringify(store.getState())); */
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;