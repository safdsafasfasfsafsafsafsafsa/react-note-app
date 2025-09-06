// https://zindex.tistory.com/362

import React, { useState } from "react";
import style from "./Note.module.css";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updatePinToLocalStorage } from "../../store/asyncThunks/noteThunk";
import {
  openModalNoteUpdate,
  closeModalNoteUpdate,
} from "../../store/slices/modalSlice";
import type { Note, NoteProps } from "../../interfaces/types";
import dateFormat from "../../utils/dateFormat";
import { truncateText } from "../../utils/truncateText";
import ModalNoteUpdate from "../modals/ModalNoteUpdate";

export default function Note({ note }: NoteProps) {
  // const navigate = useNavigate();

  // const handleNav = (tagName: string) => {
  //   navigate(`/tag/${tagName}`);
  // };

  const dispatch = useAppDispatch();

  const { isNoteOpenUpdate } = useAppSelector((state) => state.modal);

  const handleModalNote = () => {
    if (!isNoteOpenUpdate) {
      dispatch(openModalNoteUpdate());
    }
  };

  // isPinned 변환
  const handleIsPinned = (note: Note) => {
    dispatch(updatePinToLocalStorage(note));
  };

  // 타이틀 & 내용 줄이기
  const trunTitle = truncateText(note.title, 18);
  const trunContext = truncateText(note.content, 160);

  // 지역 변환: yyyy/mm/dd hh:mm:ss
  const [currentNote, setCurrentNote] = useState<Note>(note);
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
              <img
                onClick={() => handleIsPinned(currentNote)}
                src="/img/pin.svg"
                alt="pin"
              />
            ) : (
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
          <div>
            <img onClick={handleModalNote} src="/img/pencil.svg" alt="update" />
            <img src="/img/trash-can.svg" alt="delete" />
          </div>
        </div>
      </div>
      {isNoteOpenUpdate && (
        <ModalNoteUpdate
          noteId={note.id}
          onClose={() => dispatch(closeModalNoteUpdate())}
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
