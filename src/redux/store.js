import { configureStore } from '@reduxjs/toolkit';
// import combinedSlice from './slices/combinedSlice';
// import userReducer from './slices/userSlice';
import combinedReducer from "./slices/combinedSlice";

export const store = configureStore({
  reducer: {
    // users: userReducer,
    combined: combinedReducer
  },
});
