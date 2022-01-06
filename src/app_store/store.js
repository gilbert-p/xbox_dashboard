import { configureStore } from '@reduxjs/toolkit';
import xboxReducer from '../xbox_dashboard/xboxSlice';

export const store = configureStore({
  reducer: {
    dashboard: xboxReducer,
  },
});
