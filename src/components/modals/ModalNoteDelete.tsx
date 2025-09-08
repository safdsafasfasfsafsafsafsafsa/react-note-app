import React from "react";
import style from "./ModalSort.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteNoteToLocalStorage } from "../../store/asyncThunks/noteThunk";
import { closeModalNoteDelete } from "../../store/slices/modalSlice";
import { noteIdUpdate } from "../../store/slices/noteUpdateSlice";

import type { IModalProps, INote } from "../../interfaces/types";

export default function ModalNoteDelete({ onClose }: IModalProps) {
  const dispatch = useAppDispatch();

  const { id, notes, prodNotes, insertTags, status } = useAppSelector(
    (state) => state.main
  );
  const { noteId } = useAppSelector((state) => state.noteUpdate);

  const noteIndex = prodNotes.findIndex((note) => note.id === noteId);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      dispatch(noteIdUpdate("")); // 종료 시 noteId 초기화
      onClose();
    }
  };
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleDelete = () => {
    if (notes[noteIndex] && prodNotes[noteIndex]) {
      const deleteNote: INote = prodNotes[noteIndex];
      dispatch(deleteNoteToLocalStorage(deleteNote));
    }

    if (status === "succeeded") {
      dispatch(noteIdUpdate("")); // 종료 시 noteId 초기화
      dispatch(closeModalNoteDelete());
    }
  };

  return (
    <div className={style.modal} onClick={handleOverlayClick}>
      <div className={style.wrapper} onClick={handleContentClick}>
        <p>삭제하시겠습니까?</p>
        <button onClick={handleDelete}>CLEAR</button>
      </div>
    </div>
  );
}
