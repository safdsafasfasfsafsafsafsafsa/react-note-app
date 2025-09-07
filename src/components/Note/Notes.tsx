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

  // switch는 변수 스코프가 없어 let으로 외부 접근해야
  let sortedNotes = [...searchTitleToNotes]; // 복사본 생성

  switch (sortOption) {
    case "high": {
      sortedNotes = sortByPriorityHigh(sortedNotes);
      break;
    }
    case "low": {
      sortedNotes = sortByPriorityLow(sortedNotes);
      break;
    }
    case "latest": {
      sortedNotes = sortByLatestDate(sortedNotes);
      break;
    }
    case "created": {
      sortedNotes = sortByCreatedDate(sortedNotes);
      break;
    }
    case "edited": {
      sortedNotes = sortByEditedDate(sortedNotes);
      break;
    }
    default: {
      break;
    }
  }

  // isTrash 확인
  const sortedNotes2 = sortedNotes.filter((note) => !note.isTrash);

  // isPinned 분기
  const pinnedNotes = sortedNotes2.filter((note) => note.isPinned);

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
          {sortedNotes2.map((note) => (
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
