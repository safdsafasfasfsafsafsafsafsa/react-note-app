import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { Note, NewNote, Tags } from "../../interfaces/types";
import createNote from "../../utils/createNote";

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
