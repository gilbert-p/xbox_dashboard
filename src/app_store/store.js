import { configureStore } from '@reduxjs/toolkit';
import xboxReducer from '../xbox_dashboard/xboxSlice';
import systemReducer from '../xbox_dashboard/systemSlice';


export const store = configureStore({
  reducer: {
    dashboard: xboxReducer,
    system: systemReducer
  },
});
