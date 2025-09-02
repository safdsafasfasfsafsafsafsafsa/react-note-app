import React from "react";
import style from "./Note.module.css";

export default function Note() {
  return (
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
  );
}
