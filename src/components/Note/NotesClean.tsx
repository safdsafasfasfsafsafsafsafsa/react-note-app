import React from "react";
import style from "./Notes.module.css";
import Note from "../../components/Note/Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function NotesClean() {
  const { prodNotes } = useAppSelector((state) => state.main);

  return (
    <div className={style.notes}>
      {/* isPinned:true map */}
      {/* isTrash:true map */}
      <div className={style.noteholder}>
        {prodNotes.map((note) =>
          note.isPinned ? <Note key={note.id} note={note} /> : <></>
        )}
      </div>
    </div>
  );
}

/**
 * slice 불러서 Note Props에 넣을거 찾기
 */
