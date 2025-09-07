import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import style from "./ModalNote.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ModalTag from "./ModalTag";

import {
  openModalTag,
  closeModalTag,
  closeModalNoteUpdate,
} from "../../store/slices/modalSlice";
import { noteIdUpdate } from "../../store/slices/noteUpdateSlice";
import { updateNoteToLocalStorage } from "../../store/asyncThunks/noteThunk";

import type { IModalProps, INote, INewNote } from "../../interfaces/types";

// note.id를 props 해서 초기값 받아오기
export default function ModalNoteUpdate({ onClose }: IModalProps) {
  const dispatch = useAppDispatch();

  const { id, notes, prodNotes, tags, status } = useAppSelector(
    (state) => state.main
  );
  const { isTagOpen } = useAppSelector((state) => state.modal);
  const { noteId } = useAppSelector((state) => state.noteUpdate);

  // // 현 위치 객체 불러오기
  const noteIndex = prodNotes.findIndex((note) => note.id === noteId);

  // 보낼 내용, 초기값은 원래 객체에서 받아오기
  const [titleValue, setTitleValue] = useState<string>(
    prodNotes[noteIndex].title
  );
  const [editerValue, setEditerValue] = useState<string>(
    prodNotes[noteIndex].content
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    prodNotes[noteIndex].color
  );
  const [selectedPriority, setSelectedPriority] = useState<string>(
    prodNotes[noteIndex].priority
  );

  // 버블링 방지
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      dispatch(noteIdUpdate("")); // 종료 시 noteId 초기화
      onClose();
    }
  };
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 모달
  const handleModalTag = () => {
    if (!isTagOpen) {
      dispatch(openModalTag());
    }
  };

  // 타이틀과 드롭다운 메뉴 체크하기
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };
  const handleChangeColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };
  const handleChangePriority = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPriority(event.target.value);
  };

  // 업데이트
  const handleUpdateNote = ({
    newTitle,
    newContent,
    newColor,
    newPriority,
  }: INewNote) => {
    // 기존 노트가 존재한다면 실행
    if (prodNotes[noteIndex]) {
      const updateNote: INote = {
        ...prodNotes[noteIndex], // 기존 속성들을 복사
        title: newTitle,
        content: newContent,
        color: newColor,
        priority: newPriority,
        updateDate: new Date().toISOString(), // ✅ 수정 날짜 갱신
      };

      dispatch(updateNoteToLocalStorage(updateNote));
    }

    // 성공 시 초기화
    if (status === "succeeded") {
      dispatch(noteIdUpdate("")); // 종료 시 noteId 초기화
      setTitleValue("");
      setEditerValue("");
      setSelectedColor("white");
      setSelectedPriority("low");
      dispatch(closeModalNoteUpdate());
    }
  };

  return (
    <>
      <div className={style.modal} onClick={handleOverlayClick}>
        <div className={style.wrapper} onClick={handleContentClick}>
          <p>노트 수정하기</p>
          <input
            className={style.title}
            type="text"
            placeholder="제목"
            value={titleValue}
            onChange={handleChangeTitle}
          />
          <ReactQuill
            className={style.editer}
            theme="snow"
            placeholder="내용을 입력하세요"
            value={editerValue}
            onChange={setEditerValue}
          />
          <div className={style.bottom}>
            <div className={style.BottomWrapper}>
              <button className={style.btnTag} onClick={handleModalTag}>
                Add Tag
              </button>
              <div>
                배경색:
                <select name="color" id="color" onChange={handleChangeColor}>
                  <option value="white">white</option>
                  <option value="#ffe6e6">red</option>
                  <option value="#e6ffe6">green</option>
                  <option value="#e6e6ff">blue</option>
                </select>
              </div>
              <div>
                우선순위:
                <select
                  name="priority"
                  id="priority"
                  onChange={handleChangePriority}
                >
                  <option value="low">low</option>
                  <option value="high">high</option>
                </select>
              </div>
            </div>
            <button
              className={style.btnCreate}
              onClick={() =>
                handleUpdateNote({
                  newTitle: titleValue,
                  newContent: editerValue,
                  newColor: selectedColor,
                  newPriority: selectedPriority,
                })
              }
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
      {isTagOpen && <ModalTag onClose={() => dispatch(closeModalTag())} />}
    </>
  );
}
