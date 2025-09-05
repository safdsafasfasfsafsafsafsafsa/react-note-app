import React from "react";
import style from "./Notes.module.css";
import Note from "../../components/Note/Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { NotesProps } from "../../interfaces/types";
import {
  sortByPriorityLtoH,
  sortByPriorityHtoL,
  sortByLatestDate,
  sortByCreatedDate,
  sortByEditedDate,
} from "../../utils/sortOperation";

export default function Notes({ text, isPinnedCheck }: NotesProps) {
  const dispatch = useAppDispatch();

  const { prodNotes } = useAppSelector((state) => state.main);
  const { sortOption } = useAppSelector((state) => state.sort);
  let sortedNote = [];

  switch (sortOption) {
    case "ltoh": {
      sortedNote = sortByPriorityLtoH(prodNotes);
      break;
    }
    case "htol": {
      sortedNote = sortByPriorityHtoL(prodNotes);
      break;
    }
    case "latest": {
      sortedNote = sortByLatestDate(prodNotes);
      break;
    }
    case "created": {
      sortedNote = sortByCreatedDate(prodNotes);
      break;
    }
    case "edited": {
      sortedNote = sortByEditedDate(prodNotes);
      break;
    }
    default: {
      sortedNote = prodNotes;
      break;
    }
  }

  const pinnedNotes = sortedNote.filter((note) => note.isPinned);

  return (
    <div className={style.notes}>
      <p>{text}</p>
      {isPinnedCheck ? (
        /* 노트 컴포넌트 map, isPinned:true만 + 우선순위 high 우선 호출 */
        <div className={style.noteholder}>
          {pinnedNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      ) : (
        /* 노트 컴포넌트 map, 우선순위 high 우선 호출 */
        <div className={style.noteholder}>
          {sortedNote.map((note) => (
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
