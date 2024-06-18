// import { create } from 'zustand';

// interface LoginModalProps {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// }

// export const useLoginModal = create<LoginModalProps>((set) => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));


// import { configureStore } from '@reduxjs/toolkit';
// import loginModalReducer from './loginModalSlice';

// export const store = configureStore({
//   reducer: {
//     loginModal: loginModalReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // store/loginModalSlice.ts
// import { createSlice } from '@reduxjs/toolkit';

// interface LoginModalState {
//   isOpen: boolean;
// }

// const initialState: LoginModalState = {
//   isOpen: false,
// };

// const loginModalSlice = createSlice({
//   name: 'loginModal',
//   initialState,
//   reducers: {
//     openModal(state) {
//       state.isOpen = true;
//     },
//     closeModal(state) {
//       state.isOpen = false;
//     },
//   },
// });