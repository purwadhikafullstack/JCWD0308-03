import { createSlice } from '@reduxjs/toolkit';

interface SignupModalState {
  isOpen: boolean;
}

const initialState: SignupModalState = {
  isOpen: false,
};

const signupModalSlice = createSlice({
  name: 'signupModal',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = signupModalSlice.actions;

export default signupModalSlice.reducer;
