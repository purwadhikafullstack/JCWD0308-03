import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Room {
    id: number;
    type: string;
    price: number;
    stock: number;
    description: string;
    capacity: number;
    bedDetails?: string ;
    propertyId: number;
    createdAt: string;
    updatedAt: string;
}

export interface RoomSlice {
    currentRoom: Room | null;
    rooms: Room[];
  }
const initialState: RoomSlice = {
    currentRoom: null,
    rooms: [],
  };


export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
      setRoom: (state, action) => {
        state.currentRoom = action.payload;
      },
      setRoomsDetails: (state, action) => {
        state.rooms = action.payload;
      },
      resetRoom: (state) => {
        state.currentRoom = null;
      },
    },
});

export const { setRoom, setRoomsDetails, resetRoom } = roomSlice.actions;

export default roomSlice.reducer;
