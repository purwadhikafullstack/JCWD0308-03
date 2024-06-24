// import { combineSlices, configureStore } from '@reduxjs/toolkit';

// import loginModalReducer from './login/loginModalSlice';
// import signupModalSlice from './signup/signupModalSlice';

// export const store = configureStore({
//   reducer: {
//     loginModal: loginModalReducer,
//     signupModal : signupModalSlice,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import  loginModalReducer  from "./login/loginModalSlice";
import signupModalReducer from "./signup/signupModalSlice";
import userSlice from './features/profile/userSlice';

const rootReducer = combineReducers({
  loginModal: loginModalReducer,
  signupModal: signupModalReducer,
  user : userSlice
  // Add more reducers as needed
});

const store = configureStore({
  reducer: rootReducer,
});

// Define TypeScript types for Redux
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Export the configured store
export default store;
