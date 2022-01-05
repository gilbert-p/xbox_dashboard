import {createSlice } from '@reduxjs/toolkit';

let initialState = {
    current_page: "games",
}

export const counterSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      navigate_to: (state) => {

      },
    },
  });