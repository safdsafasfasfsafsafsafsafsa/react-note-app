import React from "react";
import style from "./Notes.module.css";
import Note from "./Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function NotesClean() {
  const dispatch = useAppDispatch();

  const { notes } = useAppSelector((state) => state.main);

  return (
    <div className={style.notes}>
      {/* isPinned:true map */}
      {/* isTrash:true map */}
      <div className={style.noteholder}>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

/**
 * slice 불러서 Note Props에 넣을거 찾기
 */
