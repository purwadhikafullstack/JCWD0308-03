import { configureStore } from '@reduxjs/toolkit';
import loginModalReducer from './login/loginModalSlice';
import signupModalSlice from './signup/signupModalSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    signupModal : signupModalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;