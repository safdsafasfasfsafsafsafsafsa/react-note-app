import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadNotesFromLocalStorage } from "../asyncThunks/localStorageThunk";

// 1. 메모 객체의 타입을 정의합니다.
interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  priority: string;
  pinned: false;
  tag: string;
  date: string;
  isTrash: false;
}

// 2. slice의 상태 타입을 정의합니다.
interface NoteState {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: NoteState = {
  notes: [],
  status: "idle",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    // 4. 리듀서의 액션 페이로드 타입을 정의합니다.
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // 5. 비동기 thunk의 생명주기 액션을 처리합니다.
    builder
      .addCase(loadNotesFromLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadNotesFromLocalStorage.fulfilled,
        (state, action: PayloadAction<Note[]>) => {
          state.status = "succeeded";
          state.notes = action.payload;
        }
      )
      .addCase(loadNotesFromLocalStorage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addNote } = mainSlice.actions;
export default mainSlice.reducer;
