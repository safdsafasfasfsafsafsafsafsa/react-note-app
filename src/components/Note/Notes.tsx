import React from "react";
import style from "./Notes.module.css";
import Note from "../../components/Note/Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { NotesProps } from "../../interfaces/types";

export default function Notes({ text, isPinnedCheck }: NotesProps) {
  const dispatch = useAppDispatch();

  const { prodNotes } = useAppSelector((state) => state.main);

  return (
    <div className={style.notes}>
      <p>{text}</p>
      {isPinnedCheck ? (
        /* 노트 컴포넌트 map, isPinned:true만 + 우선순위 high 우선 호출 */
        <div className={style.noteholder}>
          {prodNotes.map((note) =>
            note.isPinned ? <Note key={note.id} note={note} /> : <></>
          )}
        </div>
      ) : (
        /* 노트 컴포넌트 map, 우선순위 high 우선 호출 */
        <div className={style.noteholder}>
          {prodNotes.map((note) => (
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
