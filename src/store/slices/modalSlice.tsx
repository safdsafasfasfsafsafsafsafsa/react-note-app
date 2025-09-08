import { createSlice } from "@reduxjs/toolkit";

interface IModal {
  isNoteOpen: boolean;
  isNoteUpdateOpen: boolean;
  isNoteDeleteOpen: boolean;
  isTagOpen: boolean;
  isTagUpdateOpen: boolean;
  isSortOpen: boolean;
}

const initialState: IModal = {
  isNoteOpen: false,
  isNoteUpdateOpen: false,
  isNoteDeleteOpen: false,
  isTagOpen: false,
  isTagUpdateOpen: false,
  isSortOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalNote: (state) => {
      state.isNoteOpen = true;
    },
    closeModalNote: (state) => {
      state.isNoteOpen = false;
    },
    openModalNoteUpdate: (state) => {
      state.isNoteUpdateOpen = true;
    },
    closeModalNoteUpdate: (state) => {
      state.isNoteUpdateOpen = false;
    },
    openModalNoteDelete: (state) => {
      state.isNoteDeleteOpen = true;
    },
    closeModalNoteDelete: (state) => {
      state.isNoteDeleteOpen = false;
    },
    openModalTag: (state) => {
      state.isTagOpen = true;
    },
    closeModalTag: (state) => {
      state.isTagOpen = false;
    },
    openModalTagUpdate: (state) => {
      state.isTagUpdateOpen = true;
    },
    closeModalTagUpdate: (state) => {
      state.isTagUpdateOpen = false;
    },
    openModalSort: (state) => {
      state.isSortOpen = true;
    },
    closeModalSort: (state) => {
      state.isSortOpen = false;
    },
  },
});

export const {
  openModalNote,
  closeModalNote,
  openModalNoteUpdate,
  closeModalNoteUpdate,
  openModalNoteDelete,
  closeModalNoteDelete,
  openModalTag,
  closeModalTag,
  openModalTagUpdate,
  closeModalTagUpdate,
  openModalSort,
  closeModalSort,
} = modalSlice.actions;
export default modalSlice.reducer;

/**
 * z-index 배치
 * 최하: 페이지
 * 중간: 노트, 정렬
 * 최상: 태그
 */
