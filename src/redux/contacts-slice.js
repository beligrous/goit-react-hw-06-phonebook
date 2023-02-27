import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: {
      reducer: (state, action) => [...state, action.payload],
      prepare: data => {
        return { payload: { ...data, id: nanoid() } };
      },
    },
    delContact: (state, action) =>
      state.filter(item => item.id !== action.payload),
  },
});

export const { addContact, delContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
