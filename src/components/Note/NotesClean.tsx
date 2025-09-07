import React from "react";
import style from "./Notes.module.css";
import Note from "../../components/Note/Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { INotesTrashProps } from "../../interfaces/types";

export default function NotesClean({ isTrashCheck }: INotesTrashProps) {
  const { prodNotes } = useAppSelector((state) => state.main);

  const sortedNotes = [...prodNotes]; // 복사본 생성

  // isTrash:true 확인
  const trashNotes = sortedNotes.filter((note) => note.isTrash);

  // isPinned 분기
  const pinnedNotes = sortedNotes.filter(
    (note) => !note.isTrash && note.isPinned
  );

  return (
    <div className={style.notes}>
      {isTrashCheck ? (
        // isTrash:true map
        <div className={style.noteholder}>
          {trashNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      ) : (
        // isTrash:false && isPinned:true map
        <div className={style.noteholder}>
          {pinnedNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * slice 불러서 Note Props에 넣을거 찾기
 */
