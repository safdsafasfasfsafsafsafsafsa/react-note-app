import React from "react";
import NavBtn from "./NavBtn";
import style from "./Nav.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function Nav() {
  const dispatch = useAppDispatch();

  const { notes, prodNotes, tags, status } = useAppSelector(
    (state) => state.main
  );

  // mainSlice 테스트 코드
  const handleMainSlice = () => {
    console.log("notes:", notes);
    console.log("prodNotes:", prodNotes);
    console.log("tags:", tags);
    console.log("status:", status);
  };

  return (
    <>
      <nav className={style.nav}>
        <h2 className={style.title} onClick={handleMainSlice}>
          Keep
        </h2>
        <NavBtn src={"/img/light-bulb.svg"} text={"Notes"} nav={""} />
        {/* tag는 따로 map으로 불어날 예정 */}
        {/* <NavBtn src={"/img/tag.svg"} text={"Coding"} />
        <NavBtn src={"/img/tag.svg"} text={"Coding"} />
        <NavBtn src={"/img/tag.svg"} text={"Coding"} /> */}
        <NavBtn src={"/img/box.svg"} text={"Archive"} nav={"archive"} />
        <NavBtn src={"/img/trash-can.svg"} text={"Trash"} nav={"trash"} />
      </nav>
    </>
  );
}
