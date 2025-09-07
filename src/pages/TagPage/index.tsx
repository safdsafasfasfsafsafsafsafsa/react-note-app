import React from "react";
import style from "../../styles/page.module.css";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import NotesCleanTags from "../../components/Note/NotesCleanTags";

export default function TagPage() {
  // useParam 이름은 App.tsx에 컴포넌트한 이름으로
  const { name } = useParams();
  const dispatch = useAppDispatch();

  const { prodNotes } = useAppSelector((state) => state.main);

  // string | undefined 해결
  const tagName = name || "";

  if (!name) {
    return <div>유효한 노트 ID를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div className={style.page}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <h2>Tag:</h2>
          </div>
          {/* 특정 태그 map */}
          <NotesCleanTags tag={tagName} />
        </div>
      </div>
    </>
  );
}

/**
 * 특정 태그만 출력, 추가 누르면 바로 현 태그 적용되도록?
 */
