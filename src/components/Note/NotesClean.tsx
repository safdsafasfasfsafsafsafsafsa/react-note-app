import React from "react";
import style from "./Notes.module.css";
import Note from "./Note";

// interface NotesProps {
//   text: string;
// }

export default function NotesClean() {
  return (
    <div className={style.notes}>
      {/* pinned:true map */}
      {/* isTrash:true map */}
      <div className={style.noteholder}>
        <Note />
        <Note />
        <Note />
      </div>
    </div>
  );
}

/**
 * slice 불러서 Note Props에 넣을거 찾기
 */
