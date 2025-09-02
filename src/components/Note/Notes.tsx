import React from "react";
import style from "./Notes.module.css";
import Note from "../../components/Note/Note";

interface NotesProps {
  text: string;
}

export default function Notes({ text }: NotesProps) {
  return (
    <div className={style.notes}>
      <p>{text}</p>
      {/* 노트 컴포넌트 map, pinned:true만 호출 */}
      {/* 노트 컴포넌트 map, 우선순위 high 우선 호출 */}
      <div className={style.noteholder}>
        <Note />
        <Note />
        <Note />
      </div>
    </div>
  );
}
