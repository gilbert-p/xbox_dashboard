import { configureStore } from '@reduxjs/toolkit';
import xboxReducer from '../xbox_dashboard/xboxSlice';
import menuReducer from '../xbox_dashboard/menuSlice';


export const store = configureStore({
  reducer: {
    dashboard: xboxReducer,
    menu: menuReducer
  },
});
