import React from "react";
import style from "../../styles/page.module.css";
import NotesClean from "../../components/Note/NotesClean";

export default function ArchivePage() {
  return (
    <>
      <div className={style.page}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <h2>Archive</h2>
          </div>
          <NotesClean isTrashCheck={false} />
        </div>
      </div>
    </>
  );
}

/**
 * 정보가 없는데 그냥 isPinned:true 모으기?
 *
 * 간단한 작업이 될거 같으니 Notes 배열 추출해서 filter만
 */
