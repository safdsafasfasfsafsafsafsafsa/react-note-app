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
