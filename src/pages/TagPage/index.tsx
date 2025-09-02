import React from "react";
import style from "../../styles/page.module.css";
import Note from "../../components/Note/Note";

export default function TagPage() {
  return (
    <>
      <div className={style.page}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <h2>Note</h2>
            <button>+</button>
          </div>
          {/* 특정 태그 map */}
          <Note />
        </div>
      </div>
    </>
  );
}

/**
 * 특정 태그만 출력, 추가 누르면 바로 현 태그 적용되도록?
 */
