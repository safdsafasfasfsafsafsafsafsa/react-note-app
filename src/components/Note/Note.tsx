// https://zindex.tistory.com/362

import React, { useState } from "react";
import style from "./Note.module.css";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  updatePinToLocalStorage,
  updateTrashToLocalStorage,
} from "../../store/asyncThunks/noteThunk";
import {
  openModalNoteUpdate,
  closeModalNoteUpdate,
  openModalDeletePermanently,
  closeModalDeletePermanently,
} from "../../store/slices/modalSlice";
import { noteIdUpdate } from "../../store/slices/noteUpdateSlice";

import type { INote, INoteProps } from "../../interfaces/types";

import dateFormat from "../../utils/dateFormat";
import { truncateText } from "../../utils/truncateText";
import ModalNoteUpdate from "../modals/ModalNoteUpdate";
import ModalNoteDelete from "../modals/ModalNoteDelete";

export default function Note({ note }: INoteProps) {
  // const navigate = useNavigate();

  // const handleNav = (tagName: string) => {
  //   navigate(`/tag/${tagName}`);
  // };

  const dispatch = useAppDispatch();

  const { isNoteUpdateOpen, isDeletePermanentlyOpen } = useAppSelector(
    (state) => state.modal
  );

  // 모달 열기: 현 노트의 상태 이월
  const handleModalNoteUpdate = () => {
    if (!isNoteUpdateOpen) {
      dispatch(noteIdUpdate(note.id));
      dispatch(openModalNoteUpdate());
    }
  };

  const handleModalNoteDelete = () => {
    if (!isDeletePermanentlyOpen) {
      dispatch(noteIdUpdate(note.id));
      dispatch(openModalDeletePermanently());
    }
  };

  // isPinned 변환
  const handleIsPinned = (note: INote) => {
    dispatch(updatePinToLocalStorage(note));
  };

  // isTrash 변환
  const handleIsTrash = (note: INote) => {
    dispatch(updateTrashToLocalStorage(note));
  };

  // 타이틀 & 내용 줄이기
  const trunTitle = truncateText(note.title, 18);
  const trunContext = truncateText(note.content, 160);

  // 지역 변환: yyyy/mm/dd hh:mm:ss
  const [currentNote, setCurrentNote] = useState<INote>(note);
  const dateForNote = dateFormat(new Date(currentNote.createDate));

  return (
    <>
      <div
        id={note.id}
        className={style.note}
        style={{ backgroundColor: note.color }}
      >
        <div className={style.note__title}>
          <h3>{trunTitle}</h3>
          <div>
            <p>{note.priority}</p>
            {note.isPinned ? (
              // true
              <img
                onClick={() => handleIsPinned(currentNote)}
                src="/img/pin.svg"
                alt="pin"
              />
            ) : (
              // false
              <img
                onClick={() => handleIsPinned(currentNote)}
                src="/img/pin_empty.svg"
                alt="pin"
              />
            )}
          </div>
        </div>
        <div className={style.note__content}>
          {/* react-quill: WYSIWYG 적용 */}
          <div dangerouslySetInnerHTML={{ __html: trunContext }} />
        </div>
        <div className={style.note__tag}>
          <p>{note.tag}</p>
        </div>
        <div className={style.note__bottom}>
          <p>{dateForNote}</p>
          <div className={style.note__imgs}>
            {note.isTrash ? (
              // true: Trash Page에만 출력, 복구 or 완전 삭제
              <>
                <div className={style.note__img}>
                  <img
                    onClick={() => handleIsTrash(currentNote)}
                    src="/img/reverse-left.svg"
                    alt="undo"
                  />
                </div>
                <div className={style.note__img}>
                  <img
                    onClick={handleModalNoteDelete}
                    src="/img/trash-can.svg"
                    alt="deletePermanently"
                  />
                </div>
              </>
            ) : (
              // false: 일반 Page, 수정 or 삭제
              <>
                <div className={style.note__img}>
                  <img
                    onClick={handleModalNoteUpdate}
                    src="/img/pencil.svg"
                    alt="update"
                  />
                </div>
                <div className={style.note__img}>
                  <img
                    onClick={() => handleIsTrash(currentNote)}
                    src="/img/trash-can.svg"
                    alt="delete"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isNoteUpdateOpen && (
        <ModalNoteUpdate onClose={() => dispatch(closeModalNoteUpdate())} />
      )}
      {isDeletePermanentlyOpen && (
        <ModalNoteDelete
          onClose={() => dispatch(closeModalDeletePermanently())}
        />
      )}
    </>
  );
}

/**
 * 호버 시 전체 커지는건 좀 그렇고 그림자만 좀 짙게?
 * 내부 버튼 호버 시 짙어지도록
 *
 * 노트 제목과 content: 일정 글자수 이상이면 줄임,
 * 클릭 시 모달 확장해 내용 출력(후순위)
 *
 * 작성 date: 연/월/일 시간 PM
 * 수정 date: 상세 화면에서만 표기
 */
