import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import  loginModalReducer  from "./login/loginModalSlice";
import signupModalReducer from "./signup/signupModalSlice";
import userReducer from './features/profile/userSlice';

const rootReducer = combineReducers({
  loginModal: loginModalReducer,
  signupModal: signupModalReducer,
  user : userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
