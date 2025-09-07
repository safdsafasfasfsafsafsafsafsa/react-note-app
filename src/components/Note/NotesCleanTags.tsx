import React from "react";
import style from "./Notes.module.css";
import Note from "./Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { ITags } from "../../interfaces/types";

export default function NotesCleanTags({ tag }: ITags) {
  const { prodNotes } = useAppSelector((state) => state.main);

  const sortedNotes = [...prodNotes]; // 복사본 생성

  const tagNotes = sortedNotes.filter((note) => note.tag == tag);

  return (
    <div className={style.notes}>
      <div className={style.noteholder}>
        {tagNotes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

/**
 * slice 불러서 Note Props에 넣을거 찾기
 */
