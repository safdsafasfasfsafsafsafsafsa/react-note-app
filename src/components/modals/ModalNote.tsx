import React from "react";
import Editer from "../Editer";
import style from "./ModalNote.module.css";

// 모달 컴포넌트의 props 타입을 정의합니다.
interface ModalProps {
  onClose: () => void;
}

export default function ModalNote({ onClose }: ModalProps) {
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

  return (
    <div className={style.modal} onClick={handleOverlayClick}>
      <div className={style.modalnote} onClick={handleContentClick}>
        <p>노트 생성하기</p>
        <input className="__title" type="text" name="" id="" />
        <Editer />
        <div className="low">
          <button className="__btn-tag">Add Tag</button>
          <div>
            배경색:
            <select name="color" id="">
              <option value="white">white</option>
              <option value="red">red</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
            </select>
          </div>
          <div>
            우선순위:
            <select name="priority" id="">
              <option value="low">low</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>
        <button className="__btn-create">생성하기</button>
      </div>
    </div>
  );
}

/**
 * Editer에서 작성한 걸 btn-create 누르면 noteSlice로
 */
