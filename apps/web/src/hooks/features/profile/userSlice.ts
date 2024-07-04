import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  profile: string;
  role: string;
  phoneNumber?: number;
}
export interface UserSlice {
  value: User | null;
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
