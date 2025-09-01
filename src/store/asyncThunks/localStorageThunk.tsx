import { createAsyncThunk } from "@reduxjs/toolkit";

// 1. 메모 객체의 타입을 정의합니다.
interface Note {
  id: string;
  title: string;
  content: string;
}

export const loadNotesFromLocalStorage = createAsyncThunk<Note[], void>(
  "notes/loadFromLocalStorage",
  async () => {
    // localStorage에서 'notes' 키의 값을 가져옵니다.
    const savedNotes = localStorage.getItem("notes");
    // 값이 없으면 빈 배열을 반환합니다.
    return savedNotes ? JSON.parse(savedNotes) : [];
  }
);
