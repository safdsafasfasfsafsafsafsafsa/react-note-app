import { createSlice } from "@reduxjs/toolkit";

interface Modal {
  noteId: string;
}

const initialState: Modal = {
  noteId: "",
};

const noteUpdateSlice = createSlice({
  name: "noteUpdate",
  initialState,
  reducers: {
    noteIdUpdate: (state, action) => {
      state.noteId = action.payload;
    },
  },
});

export const { noteIdUpdate } = noteUpdateSlice.actions;
export default noteUpdateSlice.reducer;
