// https://minsunblog.com/blog/7fac86c710634f93a83d0a83a51ca688

import React from "react";
import style from "./ModalTag.module.css";

interface ModalProps {
  onClose: () => void;
}

export default function ModalSort({ onClose }: ModalProps) {
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={style.modal} onClick={handleOverlayClick}>
      <div className={style.wrapper} onClick={handleContentClick}>
        <p>태그 추가하기</p>
        <input
          className={style.newTag}
          placeholder="새 태그 추가"
          type="text"
          name=""
          id=""
        />
        <div className={style.tags}>
          {/* map으로 tag만 추출 */}
          <div className={style.tag}>
            <p>Coding</p>
            <img src="/img/plus.svg" alt="" />
          </div>
          <div className={style.tag}>
            <p>Coding</p>
            <img src="/img/plus.svg" alt="" />
          </div>
          <div className={style.tag}>
            <p>Coding</p>
            <img src="/img/plus.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
