import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loadNotesFromLocalStorage,
  loadProdNotesFromLocalStorage,
  loadTagsFromLocalStorage,
  addNoteToLocalStorage,
} from "../asyncThunks/localStorageThunk";
import type { Note, Tags } from "../../interfaces/types";

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
    // changePinned: (state, action: PayloadAction<Note>) => {
    // }
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
          // ✅ 로컬 스토리지에서 불러온 노트 배열을 순회하며 날짜를 Date 객체로 변환
          // 로컬 스토리지는 자동 string 변환 -> 꺼낼 때 다시 Date 변환해야
          const parsedNotes = action.payload.map((note) => ({
            ...note,
            createDate: new Date(note.createDate),
            updateDate: new Date(note.updateDate),
          }));

          state.status = "succeeded";
          state.notes = parsedNotes;
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
          const parsedNotes = action.payload.map((note) => ({
            ...note,
            createDate: new Date(note.createDate),
            updateDate: new Date(note.updateDate),
          }));

          state.status = "succeeded";
          state.prodNotes = parsedNotes;
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
