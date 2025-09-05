// https://hianna.tistory.com/309

import React from "react";
import style from "./ModalSort.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sortChange } from "../../store/slices/sortSlice";
import type { ModalProps } from "../../interfaces/types";

export default function ModalSort({ onClose }: ModalProps) {
  const dispatch = useAppDispatch();

  const { sortOption } = useAppSelector((state) => state.sort);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sortChange(e.target.value));
    console.log("선택된 정렬 옵션:", e.target.value);
  };

  const handleSortClear = () => {
    dispatch(sortChange(""));
  };

  return (
    <div className={style.modal} onClick={handleOverlayClick}>
      <div className={style.wrapper} onClick={handleContentClick}>
        <div className={style.top}>
          <p>정렬</p>
          <button onClick={handleSortClear}>CLEAR</button>
        </div>
        <div className={style.priority}>
          <p>PRIORITY</p>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="ltoh"
              checked={sortOption === "ltoh"}
              onChange={handleSortChange}
            />
            Low to High
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="htol"
              checked={sortOption === "htol"}
              onChange={handleSortChange}
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
              checked={sortOption === "latest"}
              onChange={handleSortChange}
            />
            Sort by Latest
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="created"
              checked={sortOption === "created"}
              onChange={handleSortChange}
            />
            Sort by Created
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="edited"
              checked={sortOption === "edited"}
              onChange={handleSortChange}
            />
            Sort by Edited
          </label>
        </div>
      </div>
    </div>
  );
}
