import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type {
  INote,
  INotesProps,
  INewNote,
  ITags,
} from "../../interfaces/types";

// 추가: 새 태그 작성
export const addTagToLocalStorage = createAsyncThunk<ITags, ITags>(
  "notes/addTagToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const storedTags = localStorage.getItem("insertTags");
      const tags: ITags[] = storedTags ? JSON.parse(storedTags) : [];

      const newTag: ITags = {
        tag: item.tag,
      };

      const updateTags = [...tags, newTag];

      localStorage.setItem("insertTags", JSON.stringify(updateTags));

      return newTag;
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

// 삭제
export const deleteTagToLocalStorage = createAsyncThunk<ITags, ITags>(
  "notes/deleteTagToLocalStorage",
  async (item, thunkAPI) => {
    try {
      const storedTags = localStorage.getItem("tags");
      const tags: ITags[] = storedTags ? JSON.parse(storedTags) : [];

      const updateTags = tags.filter((tag) => tag.tag !== item.tag);

      localStorage.setItem("insertTags", JSON.stringify(updateTags));

      return item;
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
