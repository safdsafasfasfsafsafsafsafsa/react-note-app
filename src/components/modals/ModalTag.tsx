import React from "react";
import style from "./ModalTag.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addTagToLocalStorage } from "../../store/asyncThunks/tagTrunk";
import type { IModalProps, ITags } from "../../interfaces/types";

export default function ModalTag({ onClose }: IModalProps) {
  const dispatch = useAppDispatch();

  const { tags } = useAppSelector((state) => state.main);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 엔터 눌러 태그 추가
  const handleEnterAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newTag: ITags = {
        tag: event.currentTarget.value,
      };
      dispatch(addTagToLocalStorage(newTag));
    }
  };

  return (
    <div className={style.modal} onClick={handleOverlayClick}>
      <div className={style.wrapper} onClick={handleContentClick}>
        <p>태그 추가하기</p>
        <input
          className={style.newTag}
          placeholder="새 태그 추가"
          type="text"
          id="newTag"
          name="newTag"
          onKeyDown={handleEnterAddTag}
        />
        <div className={style.tags}>
          {/* map으로 tag만 추출 */}
          {tags.map((inTag) => (
            <div className={style.tag}>
              <p>{inTag.tag}</p>
              <img src="/img/plus.svg" alt="plus" />
            </div>
          ))}
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
