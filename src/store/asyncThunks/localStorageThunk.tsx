import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { Note, NewNote, Tags } from "../../interfaces/types";
import createNote from "../../utils/createNote";

// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   color: string;
//   priority: string;
//   isPinned: boolean;
//   tag: string;
//   createDate: string;
//   updateDate: string;
//   isTrash: boolean;
// }

// interface Tags {
//   tag: string;
// }

// interface NewNote {
//   newTitle: string;
//   newContent: string;
//   newColor: string;
//   newPriority: string;
//   // newTag: string;
// }

// 시작 시 호출
export const loadNotesFromLocalStorage = createAsyncThunk<Note[], void>(
  "notes/loadNotesFromLocalStorage",
  async () => {
    // localStorage에서 'notes' 키의 값을 가져옵니다.
    const savedNotes = localStorage.getItem("notes");
    // 값이 없으면 빈 배열을 반환합니다.
    return savedNotes ? JSON.parse(savedNotes) : [];
  }
);

export const loadProdNotesFromLocalStorage = createAsyncThunk<Note[], void>(
  "notes/loadProdNotesFromLocalStorage",
  async () => {
    const savedNotes = localStorage.getItem("prodNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  }
);

export const loadTagsFromLocalStorage = createAsyncThunk<Tags[], void>(
  "notes/loadTagsFromLocalStorage",
  async () => {
    const savedTags = localStorage.getItem("tags");
    return savedTags ? JSON.parse(savedTags) : [];
  }
);

// 새 노트 작성
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
