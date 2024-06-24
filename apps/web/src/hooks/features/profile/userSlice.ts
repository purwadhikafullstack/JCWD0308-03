import { createSlice } from '@reduxjs/toolkit';

export interface UserSlice {
  value: {
    id: number;
    name: string;
    email: string;
    profile: string;
    role: string;
  } | null;
}

const initialState: UserSlice = {
  value: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
