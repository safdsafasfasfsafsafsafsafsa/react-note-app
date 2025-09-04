import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import style from "./ModalNote.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  openModalTag,
  closeModalTag,
  closeModalNote,
} from "../../store/slices/modalSlice";
import { addNoteToLocalStorage } from "../../store/asyncThunks/localStorageThunk";
import ModalTag from "../../components/modals/ModalTag";

// 모달 컴포넌트의 props 타입을 정의합니다.
interface ModalProps {
  onClose: () => void;
}

interface NewNote {
  newTitle: string;
  newContent: string;
  newColor: string;
  newPriority: string;
  // newTag: string;
}

export default function ModalNote({ onClose }: ModalProps) {
  const dispatch = useAppDispatch();

  const { notes, prodNotes, tags, status } = useAppSelector(
    (state) => state.main
  );
  const { isTagOpen } = useAppSelector((state) => state.modal);

  // addNote로 보낼 내용, 전달 성공하면 초기화하기
  const [titleValue, setTitleValue] = useState<string>("");
  const [editerValue, setEditerValue] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("white");
  const [selectedPriority, setSelectedPriority] = useState<string>("low");

  const handleOverlayClick = (event: React.MouseEvent) => {
    // 이벤트가 발생한 요소가 modal-overlay인지 확인합니다.
    // 이렇게 하면 modal-content를 클릭했을 때 닫히는 것을 방지할 수 있습니다.
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handleContentClick = (event: React.MouseEvent) => {
    // 이벤트 버블링을 막아 모달 오버레이로 클릭 이벤트가 전달되는 것을 막습니다.
    event.stopPropagation();
  };

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

  // 새 노트 추가: 정상적으로 처리되면 초기화시켜야
  const handleAddNewNote = ({
    newTitle,
    newContent,
    newColor,
    newPriority,
  }: // newTag,
  NewNote) => {
    dispatch(
      addNoteToLocalStorage({ newTitle, newContent, newColor, newPriority })
    );

    // 성공 시 초기화
    if (status === "succeeded") {
      setTitleValue("");
      setEditerValue("");
      setSelectedColor("white");
      setSelectedPriority("low");
      dispatch(closeModalNote());
    }
  };

  return (
    <>
      <div className={style.modal} onClick={handleOverlayClick}>
        <div className={style.wrapper} onClick={handleContentClick}>
          <p>노트 생성하기</p>
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
                  <option value="red">red</option>
                  <option value="green">green</option>
                  <option value="blue">blue</option>
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
                handleAddNewNote({
                  newTitle: titleValue,
                  newContent: editerValue,
                  newColor: selectedColor,
                  newPriority: selectedPriority,
                })
              }
            >
              생성하기
            </button>
          </div>
        </div>
      </div>
      {isTagOpen && <ModalTag onClose={() => dispatch(closeModalTag())} />}
    </>
  );
}

/**
 * Editer에서 작성한 걸 btn-create 누르면 noteSlice로
 */
