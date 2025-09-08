import "./App.css";
import React, { useEffect } from "react";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  closeModalNote,
  closeModalNoteUpdate,
  closeModalNoteDelete,
  closeModalTag,
  closeModalTagUpdate,
  closeModalSort,
} from "./store/slices/modalSlice";
import {
  loadNotesFromLocalStorage,
  loadProdNotesFromLocalStorage,
  loadTagsFromLocalStorage,
} from "./store/asyncThunks/localStorageThunk";

import Nav from "./components/Nav/Nav";
import ModalNote from "./components/modals/ModalNote";
import ModalNoteUpdate from "./components/modals/ModalNoteUpdate";
import ModalNoteDelete from "./components/modals/ModalNoteDelete";
import ModalTag from "./components/modals/ModalTag";
import ModalTagUpdate from "./components/modals/ModalTagUpdate";
import ModalSort from "./components/modals/ModalSort";

import NotePage from "./pages/NotePage/index";
import ArchivePage from "./pages/ArchivePage/index";
import TagPage from "./pages/TagPage/index";
import TrashPage from "./pages/TrashPage/index";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.main.status);
  const {
    isNoteOpen,
    isNoteUpdateOpen,
    isNoteDeleteOpen,
    isTagOpen,
    isTagUpdateOpen,
    isSortOpen,
  } = useAppSelector((state) => state.modal);

  useEffect(() => {
    dispatch(loadNotesFromLocalStorage());
    dispatch(loadProdNotesFromLocalStorage());
    dispatch(loadTagsFromLocalStorage());
  }, [dispatch]);

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NotePage />}></Route>
          <Route path="tag" element={<Navigate to="/" />}></Route>
          <Route path="tag/:name" element={<TagPage />}></Route>
          <Route path="archive" element={<ArchivePage />}></Route>
          <Route path="trash" element={<TrashPage />}></Route>
        </Route>
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
      {isNoteOpen && <ModalNote onClose={() => dispatch(closeModalNote())} />}
      {isTagUpdateOpen && (
        <ModalTagUpdate onClose={() => dispatch(closeModalTagUpdate())} />
      )}
      {isSortOpen && <ModalSort onClose={() => dispatch(closeModalSort())} />}
      {isTagOpen && <ModalTag onClose={() => dispatch(closeModalTag())} />}
      {isNoteUpdateOpen && (
        <ModalNoteUpdate onClose={() => dispatch(closeModalNoteUpdate())} />
      )}
      {isNoteDeleteOpen && (
        <ModalNoteDelete onClose={() => dispatch(closeModalNoteDelete())} />
      )}
    </div>
  );
}

/**
 * tag 구별은 이름으로 하는게 좋을듯?
 *
 * edit note는 로고 옆에 독자적으로 띄우던가, 아니면 지우는게 낫겠다
 */
