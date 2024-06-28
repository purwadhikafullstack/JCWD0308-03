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

const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  }
  return null;
};

const initialState: UserSlice = {
  value: getUserFromLocalStorage(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    clearUser: (state) => {
      state.value = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
