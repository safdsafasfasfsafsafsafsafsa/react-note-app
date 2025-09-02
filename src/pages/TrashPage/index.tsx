import React from "react";
import style from "../../styles/page.module.css";
import NotesClean from "../../components/Note/NotesClean";

export default function TrashPage() {
  return (
    <>
      <div className={style.page}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <h2>Trash</h2>
          </div>
          <NotesClean />
        </div>
      </div>
    </>
  );
}

/**
 * pin 삭제
 * 수정 불가, 대신 trash 해제하는 아이콘으로 대체
 * 다른 페이지에서 출력되지 않도록
 * 여기서도 삭제하면 완전 제거
 *
 * note 배열에서 trash 여부를 T/F로 만들어 구분하는 게 낫나
 * 다른 페이지의 map 조건에서 isTrash를 까다롭게 잡아야
 */
