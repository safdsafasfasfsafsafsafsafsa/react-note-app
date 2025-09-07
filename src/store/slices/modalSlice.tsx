import { createSlice } from "@reduxjs/toolkit";

interface IModal {
  isNoteOpen: boolean;
  isNoteUpdateOpen: boolean;
  isTagOpen: boolean;
  isTagUpdateOpen: boolean;
  isSortOpen: boolean;
  isDeletePermanentlyOpen: boolean;
}

const initialState: IModal = {
  isNoteOpen: false,
  isNoteUpdateOpen: false,
  isTagOpen: false,
  isTagUpdateOpen: false,
  isSortOpen: false,
  isDeletePermanentlyOpen: false,
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
    openModalDeletePermanently: (state) => {
      state.isDeletePermanentlyOpen = true;
    },
    closeModalDeletePermanently: (state) => {
      state.isDeletePermanentlyOpen = false;
    },
  },
});

export const {
  openModalNote,
  closeModalNote,
  openModalNoteUpdate,
  closeModalNoteUpdate,
  openModalTag,
  closeModalTag,
  openModalTagUpdate,
  closeModalTagUpdate,
  openModalSort,
  closeModalSort,
  openModalDeletePermanently,
  closeModalDeletePermanently,
} = modalSlice.actions;
export default modalSlice.reducer;

/**
 * z-index 배치
 * 최하: 페이지
 * 중간: 노트, 정렬
 * 최상: 태그
 */
