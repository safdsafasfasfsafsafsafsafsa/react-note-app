// https://highero.tistory.com/entry/useMemo%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B4%85%EC%8B%9C%EB%8B%A4-Feat-%EC%98%88%EC%A0%9C

import React, { useMemo } from "react";
import style from "../../styles/page.module.css";
import Notes from "../../components/Note/Notes";
import {
  openModalNote,
  openModalTagUpdate,
  openModalSort,
} from "../../store/slices/modalSlice";
import { setSearchTitle } from "../../store/slices/sortSlice";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function NotePage() {
  const dispatch = useAppDispatch();

  const { prodNotes } = useAppSelector((state) => state.main);
  const { isNoteOpen, isTagUpdateOpen, isSortOpen } = useAppSelector(
    (state) => state.modal
  );
  const { searchTitle } = useAppSelector((state) => state.sort);

  // 검색: input text -> searchTitle -> Notes에서 map
  const searchTitleToNotes = useMemo(() => {
    // isTrash:true 거르기
    const sortedNotes = [...prodNotes];
    const remainNotes = sortedNotes.filter((note) => !note.isTrash);

    if (!searchTitle) {
      return remainNotes;
    }
    return remainNotes.filter((note) =>
      note.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }, [prodNotes, searchTitle]);

  // 객체의 갯수: 전체, isPinned:true
  const noteCount = searchTitleToNotes.length;
  const pinnedNoteCount = searchTitleToNotes.filter(
    (note) => note.isPinned
  ).length;

  // 디스패치 전달
  const handleSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTitle(event.target.value));
  };

  const handleModalNote = () => {
    if (!isNoteOpen) {
      dispatch(openModalNote());
    }
  };

  const handleModalTagUpdate = () => {
    if (!isTagUpdateOpen) {
      dispatch(openModalTagUpdate());
    }
  };

  const handleModalSort = () => {
    if (!isSortOpen) {
      dispatch(openModalSort());
    }
  };

  return (
    <>
      <div className={style.page}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <h2>Note</h2>
            <button onClick={handleModalNote}>+노트</button>
            <button onClick={handleModalTagUpdate}>+태그</button>
          </div>
          <div className={style.search}>
            <input
              type="text"
              placeholder="노트의 제목을 입력해주세요"
              onChange={handleSearchTitle}
            />
            <button onClick={handleModalSort}>정렬</button>
          </div>
          <Notes
            text={`Pinned Notes (${pinnedNoteCount})`}
            isPinnedCheck={true}
          />
          <Notes text={`All Notes (${noteCount})`} isPinnedCheck={false} />
        </div>
      </div>
    </>
  );
}

/**
 * 메인 화면은 비슷하게 생겼는데, css module로 공유하면 될 듯
 *
 * +노트 버튼과 별개로 +태그 버튼도 있어야 할듯
 *
 * 정렬: prodNotes 새로 만들어 sort&필터 작업 전담
 * 액션 발생하면 원본 배열 적용 뒤 새 배열에서도 적용
 * 원본 적용 -> 원본의 id 추출 -> 복제 배열에서 id 찾아 거기만 변경?
 */
