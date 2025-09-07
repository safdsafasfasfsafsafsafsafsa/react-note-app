// https://hianna.tistory.com/309

import React from "react";
import style from "./ModalSort.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sortChange } from "../../store/slices/sortSlice";
import type { IModalProps } from "../../interfaces/types";

export default function ModalSort({ onClose }: IModalProps) {
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
              value="high"
              checked={sortOption === "high"}
              onChange={handleSortChange}
            />
            High
          </label>
          <label>
            <input
              className={style.input}
              type="radio"
              name="sort"
              value="low"
              checked={sortOption === "low"}
              onChange={handleSortChange}
            />
            Low
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
