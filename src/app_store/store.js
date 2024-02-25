import { configureStore } from '@reduxjs/toolkit';
import xboxReducer from '../xbox_dashboard/xboxSlice';
import menuReducer from '../xbox_dashboard/menuSlice';
import thunk from 'redux-thunk'; 


export const store = configureStore({
  reducer: {
    dashboard: xboxReducer,
    menu: menuReducer
  },
  middleware: [thunk],
});
