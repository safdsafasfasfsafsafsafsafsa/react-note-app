import React from "react";
import Editer from "../Editer";

export default function ModalNote() {
  return (
    <div className="modal-note">
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
  );
}

/**
 * Editer에서 작성한 걸 btn-create 누르면 noteSlice로
 */
