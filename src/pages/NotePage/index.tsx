import React from "react";
import style from "../../styles/page.module.css";
import Note from "../../components/Note";

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
          <div className={style.notes}>
            <p>Pinned Notes (2)</p>
            {/* 노트 컴포넌트 map, pinned:true만 호출 */}
            <div className={style.noteholder}>
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
            </div>
          </div>
          <div className={style.notes}>
            <p>All Notes (1)</p>
            <div className={style.noteholder}>
              {/* 노트 컴포넌트 map, 우선순위 high 우선 호출 */}
              {/* <Note /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 메인 화면은 비슷하게 생겼는데, css module로 공유하면 될 듯
 *
 *
 */
