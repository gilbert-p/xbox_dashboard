import { configureStore } from '@reduxjs/toolkit';
import xboxReducer from '../redux_slices/xboxSlice';
import menuReducer from '../redux_slices/menuSlice';
import thunk from 'redux-thunk'; 

export const store = configureStore({
  reducer: {
    dashboard: xboxReducer,
    menu: menuReducer
  },
  middleware: [thunk],
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;