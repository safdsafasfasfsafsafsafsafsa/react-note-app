import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loadNotesFromLocalStorage,
  loadProdNotesFromLocalStorage,
  loadTagsFromLocalStorage,
} from "../asyncThunks/localStorageThunk";
import {
  addNoteToLocalStorage,
  updateNoteToLocalStorage,
  updatePinToLocalStorage,
  updateTrashToLocalStorage,
  deleteNoteToLocalStorage,
} from "../asyncThunks/noteThunk";
import type { INote, ITags } from "../../interfaces/types";

// 2. slice의 상태 타입을 정의합니다.
interface INoteState {
  notes: INote[];
  prodNotes: INote[];
  tags: ITags[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: INoteState = {
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
        (state, action: PayloadAction<INote[]>) => {
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
        (state, action: PayloadAction<INote[]>) => {
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
        (state, action: PayloadAction<ITags[]>) => {
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
        (state, action: PayloadAction<INote>) => {
          state.status = "succeeded";
          state.notes = [...state.notes, action.payload];
          state.prodNotes = [...state.prodNotes, action.payload];
        }
      )
      .addCase(addNoteToLocalStorage.rejected, (state) => {
        state.status = "failed";
      })

      // 수정: Note 객체 하나 변경
      .addCase(updateNoteToLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateNoteToLocalStorage.fulfilled,
        (state, action: PayloadAction<INote>) => {
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
        }
      )
      .addCase(updateNoteToLocalStorage.rejected, (state) => {
        state.status = "failed";
      })

      // 수정: isPinned 변환
      .addCase(updatePinToLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updatePinToLocalStorage.fulfilled,
        (state, action: PayloadAction<INote>) => {
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
        }
      )
      .addCase(updatePinToLocalStorage.rejected, (state) => {
        state.status = "failed";
      })

      // 수정: isTrash 변환
      .addCase(updateTrashToLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateTrashToLocalStorage.fulfilled,
        (state, action: PayloadAction<INote>) => {
          state.status = "succeeded";
          const updatedNote = action.payload;

          const noteIndex = state.notes.findIndex(
            (note) => note.id === updatedNote.id
          );
          if (noteIndex !== -1) {
            state.notes[noteIndex].isTrash = updatedNote.isTrash;
          }

          const prodNoteIndex = state.prodNotes.findIndex(
            (note) => note.id === updatedNote.id
          );
          if (prodNoteIndex !== -1) {
            state.prodNotes[prodNoteIndex].isTrash = updatedNote.isTrash;
          }
        }
      )
      .addCase(updateTrashToLocalStorage.rejected, (state) => {
        state.status = "failed";
      })

      // 삭제: Note를 DB에서 영구 삭제
      .addCase(deleteNoteToLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteNoteToLocalStorage.fulfilled,
        (state, action: PayloadAction<INote>) => {
          state.status = "succeeded";
          const deletedNote = action.payload;

          // Note 갱신
          state.notes = state.notes.filter(
            (note) => note.id !== deletedNote.id
          );

          // prodNote 갱신
          state.prodNotes = state.prodNotes.filter(
            (note) => note.id !== deletedNote.id
          );
        }
      )
      .addCase(deleteNoteToLocalStorage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default mainSlice.reducer;
