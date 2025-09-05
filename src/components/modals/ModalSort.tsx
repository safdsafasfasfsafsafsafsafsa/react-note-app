// https://hianna.tistory.com/309

import React from "react";
import style from "./ModalSort.module.css";
import type { ModalProps } from "../../interfaces/types";

// interface ModalProps {
//   onClose: () => void;
// }

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
        <div className={style.top}>
          <p>정렬</p>
          <button>CLEAR</button>
        </div>
        <div className={style.priority}>
          <p>PRIORITY</p>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="ltoh"
            />
            Low to High
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="htol"
            />
            High to Low
          </label>
        </div>
        <div className={style.date}>
          <p>DATE</p>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="latest"
            />
            Sort by Latest
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="created"
            />
            Sort by Created
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="edited"
            />
            Sort by Edited
          </label>
        </div>
      </div>
    </div>
  );
}
