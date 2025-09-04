import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loadNotesFromLocalStorage,
  loadProdNotesFromLocalStorage,
  loadTagsFromLocalStorage,
  addNoteToLocalStorage,
} from "../asyncThunks/localStorageThunk";
// import createNote from "../../utils/createNote";

// 1. 메모 객체의 타입을 정의합니다.
interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  priority: string;
  isPinned: boolean;
  tag: string;
  createDate: string;
  updateDate: string;
  isTrash: boolean;
}

interface Tags {
  tag: string;
}

// 2. slice의 상태 타입을 정의합니다.
interface NoteState {
  notes: Note[];
  prodNotes: Note[];
  tags: Tags[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: NoteState = {
  notes: [],
  prodNotes: [],
  tags: [],
  status: "idle",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    // // 4. 리듀서의 액션 페이로드 타입을 정의합니다.
    // addNote: (state, action: PayloadAction<Note>) => {
    //   state.notes.push(action.payload);
    //   state.prodNotes.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    // 5. 비동기 thunk의 생명주기 액션을 처리합니다.
    builder
      // 시작 시 로드
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
      })
      .addCase(loadProdNotesFromLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadProdNotesFromLocalStorage.fulfilled,
        (state, action: PayloadAction<Note[]>) => {
          state.status = "succeeded";
          state.prodNotes = action.payload;
        }
      )
      .addCase(loadProdNotesFromLocalStorage.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(loadTagsFromLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadTagsFromLocalStorage.fulfilled,
        (state, action: PayloadAction<Tags[]>) => {
          state.status = "succeeded";
          state.tags = action.payload;
        }
      )
      .addCase(loadTagsFromLocalStorage.rejected, (state) => {
        state.status = "failed";
      })
      // 노트 업로드
      .addCase(addNoteToLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addNoteToLocalStorage.fulfilled,
        (state, action: PayloadAction<Note>) => {
          state.status = "succeeded";
          state.notes.push(action.payload);
          state.prodNotes.push(action.payload);

          localStorage.setItem("notes", JSON.stringify(state.notes));
          localStorage.setItem("prodNotes", JSON.stringify(state.prodNotes));
        }
      )
      .addCase(addNoteToLocalStorage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const { addNote } = mainSlice.actions;
export default mainSlice.reducer;
