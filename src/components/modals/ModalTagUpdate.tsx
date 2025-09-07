import React from "react";
import style from "./ModalTag.module.css";
import type { IModalProps } from "../../interfaces/types";

export default function ModalTagUpdate({ onClose }: IModalProps) {
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
        <p>태그 수정하기</p>
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
            <img src="/img/x.svg" alt="" />
          </div>
          <div className={style.tag}>
            <p>Coding</p>
            <img src="/img/x.svg" alt="" />
          </div>
          <div className={style.tag}>
            <p>Coding</p>
            <img src="/img/x.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 추가: input 입력하고 엔터 -> tagSlice - tags 배열에 추가
 *
 * tag 중복 가능? 그럼 notes/prodNotes의 tag를 배열 식으로 바꿔야 하나
 * 노트의 tag와 전역 tag를 비교한 뒤, 이미 있는 건 minus 버튼으로 변경
 *
 * 삭제: 노트 tag와 전역 tag를 전부 서치해 한 번에 지우기
 */
