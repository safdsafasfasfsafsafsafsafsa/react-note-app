import { createAsyncThunk } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  content: string;
  pinned: false;
}

export const loadNotesFromLocalStorage = createAsyncThunk<Note[], void>(
  "notes/loadNotesFromLocalStorage",
  async () => {
    // localStorage에서 'notes' 키의 값을 가져옵니다.
    const savedNotes = localStorage.getItem("notes");
    // 값이 없으면 빈 배열을 반환합니다.
    return savedNotes ? JSON.parse(savedNotes) : [];
  }
);
