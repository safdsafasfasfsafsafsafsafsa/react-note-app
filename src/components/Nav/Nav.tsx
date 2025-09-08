import React from "react";
import NavBtn from "./NavBtn";
import style from "./Nav.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function Nav() {
  const dispatch = useAppDispatch();

  const { notes, prodNotes, insertTags, status } = useAppSelector(
    (state) => state.main
  );

  // mainSlice 테스트 코드
  const handleMainSlice = () => {
    console.log("notes:", notes);
    console.log("prodNotes:", prodNotes);
    console.log("insertTags:", insertTags);
    console.log("status:", status);
  };

  return (
    <>
      <nav className={style.nav}>
        <h2 className={style.title} onClick={handleMainSlice}>
          Keep
        </h2>
        <NavBtn src={"/img/light-bulb.svg"} text={"Notes"} nav={""} />
        {insertTags.map((inTag) => (
          <NavBtn
            src={"/img/tag.svg"}
            text={inTag.tag}
            nav={`tag/${inTag.tag}`}
          />
        ))}
        <NavBtn src={"/img/box.svg"} text={"Archive"} nav={"archive"} />
        <NavBtn src={"/img/trash-can.svg"} text={"Trash"} nav={"trash"} />
      </nav>
    </>
  );
}
