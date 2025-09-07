import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type {
  INote,
  INotesProps,
  INewNote,
  ITags,
} from "../../interfaces/types";
import createNote from "../../utils/createNote";

// 추가: 새 노트 작성
export const addNoteToLocalStorage = createAsyncThunk<INote, INewNote>(
  "notes/addNoteToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const storedNotes = localStorage.getItem("notes");
      const notes: INote[] = storedNotes ? JSON.parse(storedNotes) : [];
      const storedProdNotes = localStorage.getItem("prodNotes");
      const prodNotes: INote[] = storedProdNotes
        ? JSON.parse(storedProdNotes)
        : [];

      const newNote: INote = createNote({
        title: item.newTitle,
        content: item.newContent,
        color: item.newColor,
        priority: item.newPriority,
        // tag: newTag,
      });
      // console.log("newNote", newNote);

      /**
       * push()를 사용하는 대신,
       * **전개 구문(spread syntax)**을 사용하여 새 배열을 생성하고
       * 거기에 새 노트를 추가
       */
      const updateNotes = [...notes, newNote];
      const updateProdNotes = [...prodNotes, newNote];
      // console.log("updateNotes", updateNotes);

      localStorage.setItem("notes", JSON.stringify(updateNotes));
      localStorage.setItem("prodNotes", JSON.stringify(updateProdNotes));

      return newNote;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";
      console.error("업로드 중 에러 발생:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 수정: 노트 객체
// Note 수정 버튼 클릭해 ModalNote 나오면 수정 가능하도록
export const updateNoteToLocalStorage = createAsyncThunk<INote, INote>(
  "notes/updateNoteToLocalStorage",
  async (item, thunkAPI) => {
    try {
      // ✅ 1. 로컬 스토리지에서 기존 노트 배열을 불러옵니다.
      const storedNotes = localStorage.getItem("notes");
      const notes: INote[] = storedNotes ? JSON.parse(storedNotes) : [];
      const storedProdNotes = localStorage.getItem("prodNotes");
      const prodNotes: INote[] = storedProdNotes
        ? JSON.parse(storedProdNotes)
        : [];

      // ✅ 2. 업데이트할 노트의 인덱스를 찾습니다.
      const noteIndex = notes.findIndex((note) => note.id === item.id);

      if (noteIndex !== -1) {
        // ✅ 3. 기존 노트를 새로운 데이터로 갱신합니다.
        notes[noteIndex] = item;
        prodNotes[noteIndex] = item;

        // ✅ 4. 갱신된 배열을 로컬 스토리지에 다시 저장합니다.
        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("prodNotes", JSON.stringify(prodNotes));

        // ✅ 5. 업데이트된 노트 객체를 extraReducer로 반환합니다.
        return item;
      } else {
        // 해당 노트를 찾지 못했을 경우
        return thunkAPI.rejectWithValue("해당 노트를 찾을 수 없습니다.");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";
      console.error("노트 수정 중 에러 발생:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 수정: isPinned 체크
// 디스패치 실행 -> 그걸로 로컬에서 찾기 -> 갱신 후 boolean 변경
export const updatePinToLocalStorage = createAsyncThunk<INote, INote>(
  "notes/updatePinToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const storedNotes = localStorage.getItem("notes");
      const notes: INote[] = storedNotes ? JSON.parse(storedNotes) : [];
      const storedProdNotes = localStorage.getItem("prodNotes");
      const prodNotes: INote[] = storedProdNotes
        ? JSON.parse(storedProdNotes)
        : [];

      const newNote = createNote({
        ...item,
        isPinned: !item.isPinned,
      });

      const noteIndex = notes.findIndex((note) => note.id === item.id);

      if (noteIndex !== -1) {
        notes[noteIndex] = newNote;
        prodNotes[noteIndex] = newNote;
      }

      localStorage.setItem("notes", JSON.stringify(notes));
      localStorage.setItem("prodNotes", JSON.stringify(prodNotes));

      return newNote;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";
      console.error("pin 중 에러 발생:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 수정: isTrash 체크
// 디스패치 실행 -> 그걸로 로컬에서 찾기 -> 갱신 후 boolean 변경
export const updateTrashToLocalStorage = createAsyncThunk<INote, INote>(
  "notes/updateTrashToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const storedNotes = localStorage.getItem("notes");
      const notes: INote[] = storedNotes ? JSON.parse(storedNotes) : [];
      const storedProdNotes = localStorage.getItem("prodNotes");
      const prodNotes: INote[] = storedProdNotes
        ? JSON.parse(storedProdNotes)
        : [];

      const newNote = createNote({
        ...item,
        isTrash: !item.isTrash,
      });

      const noteIndex = notes.findIndex((note) => note.id === item.id);

      if (noteIndex !== -1) {
        notes[noteIndex] = newNote;
        prodNotes[noteIndex] = newNote;
      }

      localStorage.setItem("notes", JSON.stringify(notes));
      localStorage.setItem("prodNotes", JSON.stringify(prodNotes));

      return newNote;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";
      console.error("pin 중 에러 발생:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 삭제: 노트 객체
export const deleteNoteToLocalStorage = createAsyncThunk<INote, INote>(
  "notes/deleteNoteToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const storedNotes = localStorage.getItem("notes");
      const notes: INote[] = storedNotes ? JSON.parse(storedNotes) : [];
      const storedProdNotes = localStorage.getItem("prodNotes");
      const prodNotes: INote[] = storedProdNotes
        ? JSON.parse(storedProdNotes)
        : [];

      const updateNotes = notes.filter((note) => note.id !== item.id);
      const updateProdNotes = prodNotes.filter((note) => note.id !== item.id);

      localStorage.setItem("notes", JSON.stringify(updateNotes));
      localStorage.setItem("prodNotes", JSON.stringify(updateProdNotes));

      return item;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";
      console.error("노트 수정 중 에러 발생:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
