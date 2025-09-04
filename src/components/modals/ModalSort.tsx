// https://hianna.tistory.com/309

import React from "react";
import style from "./ModalSort.module.css";

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
        <div>
          <p>정렬</p>
          <button>CLEAR</button>
        </div>
        <div>
          <p>PRIORITY</p>
          <input type="radio" name="sort" value="ltoh" />
          Low to High
          <input type="radio" name="sort" value="htol" />
          High to Low
        </div>
        <div>
          <p>DATE</p>
          <input type="radio" name="sort" value="latest" />
          Sort by Latest
          <input type="radio" name="sort" value="created" />
          Sort by Created
          <input type="radio" name="sort" value="edited" />
          Sort by Edited
        </div>
      </div>
    </div>
  );
}
