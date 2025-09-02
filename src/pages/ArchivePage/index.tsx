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
          <NotesClean />
        </div>
      </div>
    </>
  );
}

/**
 * 정보가 없는데 그냥 pinned:true 모으기?
 */
