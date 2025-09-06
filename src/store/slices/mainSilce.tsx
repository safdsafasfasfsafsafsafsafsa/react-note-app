import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loadNotesFromLocalStorage,
  loadProdNotesFromLocalStorage,
  loadTagsFromLocalStorage,
} from "../asyncThunks/localStorageThunk";
import {
  addNoteToLocalStorage,
  updatePinToLocalStorage,
  updateNoteToLocalStorage,
} from "../asyncThunks/noteThunk";
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
  reducers: {},
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
            createDate: note.createDate,
            updateDate: note.updateDate,
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
            createDate: note.createDate,
            updateDate: note.updateDate,
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
      // 추가: 노트 업로드
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
      })
      // 수정: isPinned 변환
      .addCase(updatePinToLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updatePinToLocalStorage.fulfilled,
        (state, action: PayloadAction<Note>) => {
          state.status = "succeeded";
          const updatedNote = action.payload;

          // ✅ notes 배열에서 해당 노트 찾아서 isPinned 속성만 업데이트
          const noteIndex = state.notes.findIndex(
            (note) => note.id === updatedNote.id
          );
          if (noteIndex !== -1) {
            state.notes[noteIndex].isPinned = updatedNote.isPinned;
          }

          // ✅ prodNotes 배열에서 해당 노트 찾아서 isPinned 속성만 업데이트
          const prodNoteIndex = state.prodNotes.findIndex(
            (note) => note.id === updatedNote.id
          );
          if (prodNoteIndex !== -1) {
            state.prodNotes[prodNoteIndex].isPinned = updatedNote.isPinned;
          }

          localStorage.setItem("notes", JSON.stringify(state.notes));
          localStorage.setItem("prodNotes", JSON.stringify(state.prodNotes));
        }
      )
      .addCase(updatePinToLocalStorage.rejected, (state) => {
        state.status = "failed";
      })
      // 수정: Note 객체 하나 변경
      .addCase(updateNoteToLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateNoteToLocalStorage.fulfilled,
        (state, action: PayloadAction<Note>) => {
          state.status = "succeeded";
          const updatedNote = action.payload;

          // Note 갱신
          const noteIndex = state.notes.findIndex(
            (note) => note.id === updatedNote.id
          );
          if (noteIndex !== -1) {
            state.notes[noteIndex] = updatedNote;
          }

          // prodNote 갱신
          const prodNoteIndex = state.prodNotes.findIndex(
            (note) => note.id === updatedNote.id
          );
          if (prodNoteIndex !== -1) {
            state.prodNotes[prodNoteIndex] = updatedNote;
          }

          localStorage.setItem("notes", JSON.stringify(state.notes));
          localStorage.setItem("prodNotes", JSON.stringify(state.prodNotes));
        }
      )
      .addCase(updateNoteToLocalStorage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const { addNote } = mainSlice.actions;
export default mainSlice.reducer;
