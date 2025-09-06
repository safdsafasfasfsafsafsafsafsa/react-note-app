import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { Note, NotesProps, NewNote, Tags } from "../../interfaces/types";
import createNote from "../../utils/createNote";

// 추가: 새 노트 작성
export const addNoteToLocalStorage = createAsyncThunk<Note, NewNote>(
  "notes/addNoteToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const newNote = createNote({
        title: item.newTitle,
        content: item.newContent,
        color: item.newColor,
        priority: item.newPriority,
        // tag: newTag,
      });

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

// 수정: isPinned 체크
// 디스패치 실행 -> 그걸로 로컬에서 찾기 -> 갱신 후 boolean 변경
export const updatePinToLocalStorage = createAsyncThunk<Note, Note>(
  "notes/updatePinToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const newNote = createNote({
        ...item,
        isPinned: !item.isPinned,
      });

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

// 수정: 노트 객체
// Note 수정 버튼 클릭해 ModalNote 나오면 수정 가능하도록
export const updateNoteToLocalStorage = createAsyncThunk<Note, Note>(
  "notes/updateNoteToLocalStorage",
  async (item, thunkAPI) => {
    try {
      // ✅ 1. 로컬 스토리지에서 기존 노트 배열을 불러옵니다.
      const storedNotes = localStorage.getItem("notes");
      const notes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];

      // ✅ 2. 업데이트할 노트의 인덱스를 찾습니다.
      const noteIndex = notes.findIndex((note) => note.id === item.id);

      if (noteIndex !== -1) {
        // ✅ 3. 기존 노트를 새로운 데이터로 갱신합니다.
        notes[noteIndex] = item;

        // ✅ 4. 갱신된 배열을 로컬 스토리지에 다시 저장합니다.
        localStorage.setItem("notes", JSON.stringify(notes));

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
