import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import questionReducer from "./slices/questionsSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    questions: questionReducer
  },
});
