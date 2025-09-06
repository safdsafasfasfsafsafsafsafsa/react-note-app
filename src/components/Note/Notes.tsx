import React, { useMemo } from "react";
import style from "./Notes.module.css";
import Note from "../../components/Note/Note";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { INote, INotesProps } from "../../interfaces/types";
import {
  sortByPriorityHigh,
  sortByPriorityLow,
  sortByLatestDate,
  sortByCreatedDate,
  sortByEditedDate,
} from "../../utils/sortOperation";
import { setSearchTitle } from "../../store/slices/sortSlice";

export default function Notes({ text, isPinnedCheck }: INotesProps) {
  const { prodNotes } = useAppSelector((state) => state.main);
  const { sortOption, searchTitle } = useAppSelector((state) => state.sort);

  // 검색: input text -> searchTitle -> Notes에서 map
  const searchTitleToNotes: INote[] = useMemo(() => {
    if (!searchTitle) {
      return prodNotes;
    }
    return prodNotes.filter((note) =>
      note.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }, [prodNotes, searchTitle]);

  let sortedNotes = [...searchTitleToNotes]; // 복사본 생성

  switch (sortOption) {
    case "high": {
      sortedNotes = sortByPriorityHigh(prodNotes);
      break;
    }
    case "low": {
      sortedNotes = sortByPriorityLow(prodNotes);
      break;
    }
    case "latest": {
      sortedNotes = sortByLatestDate(prodNotes);
      break;
    }
    case "created": {
      sortedNotes = sortByCreatedDate(prodNotes);
      break;
    }
    case "edited": {
      sortedNotes = sortByEditedDate(prodNotes);
      break;
    }
    default: {
      sortedNotes = prodNotes;
      break;
    }
  }

  const pinnedNotes = sortedNotes.filter((note) => note.isPinned);

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
          {sortedNotes.map((note) => (
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
