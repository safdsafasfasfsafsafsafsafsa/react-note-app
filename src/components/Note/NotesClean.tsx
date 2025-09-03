import React from "react";
import style from "./Notes.module.css";
import Note from "./Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  priority: string;
  isPinned: boolean;
  tag: string;
  createDate: string;
  updateDate: string;
  isTrash: boolean;
}

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
