import React from "react";
import style from "../../styles/page.module.css";

export default function NotePage() {
  return (
    <>
      <div className={style.page}>
        <div className={style.header}>
          <h2>Note</h2>
          <button>+</button>
        </div>
        <div className={style.search}>
          <input type="text" />
          <button>정렬</button>
        </div>
        <div className={style.notes}>
          <p>Pinned Notes (2)</p>
          {/* 노트 컴포넌트 map, pinned:true만 호출 */}
          <div className={style.note}>
            <div className={style.note__title}>
              <h3>Note 1</h3>
              <div>
                <p>HIGH</p>
                <img src="/img/pin_empty.svg" alt="pin" />
              </div>
            </div>
            <div className={style.note__content}>
              <p>asfadfafsafsa</p>
            </div>
            <div className={style.note__tag}>
              <p>dfdsffdas</p>
            </div>
            <div className={style.note__bottom}>
              <p>time</p>
              <div>
                <img src="/img/pencil.svg" alt="update" />
                <img src="/img/trash-can.svg" alt="delete" />
              </div>
            </div>
          </div>
        </div>
        <div className={style.notes}>
          <p>All Notes (1)</p>
          {/* 노트 컴포넌트 map, 우선순위 high 우선 호출 */}
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
