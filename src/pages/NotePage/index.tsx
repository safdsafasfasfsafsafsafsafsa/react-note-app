import React from "react";
import style from "../../styles/page.module.css";
import Notes from "../../components/Note/Notes";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import createNote from "../../utils/createNote";

export default function NotePage() {
  const dispatch = useAppDispatch();

  const { prodNotes } = useAppSelector((state) => state.main);

  return (
    <>
      <div className={style.page}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <h2>Note</h2>
            <button>+</button>
          </div>
          <div className={style.search}>
            <input type="text" placeholder="노트의 제목을 입력해주세요" />
            <button>정렬</button>
          </div>
          <Notes text={`Pinned Notes (${prodNotes.length})`} />
          <Notes text={`All Notes (${prodNotes.length})`} />
        </div>
      </div>
    </>
  );
}

/**
 * 메인 화면은 비슷하게 생겼는데, css module로 공유하면 될 듯
 *
 * 정렬: prodNotes 새로 만들어 sort&필터 작업 전담
 * 액션 발생하면 원본 배열 적용 뒤 새 배열에서도 적용
 * 원본 적용 -> 원본의 id 추출 -> 복제 배열에서 id 찾아 거기만 변경?
 */
