import React from "react";
import style from "../../styles/page.module.css";
import Notes from "../../components/Note/Notes";

export default function NotePage() {
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
          <Notes text="Pinned Notes (2)" />
          <Notes text="All Notes (1)" />
        </div>
      </div>
    </>
  );
}

/**
 * 메인 화면은 비슷하게 생겼는데, css module로 공유하면 될 듯
 */
