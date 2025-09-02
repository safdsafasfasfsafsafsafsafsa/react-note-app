import React from "react";
import NavBtn from "./NavBtn";
import style from "./Nav.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function Nav() {
  const dispatch = useAppDispatch();

  //   const { notes, status } = useSelector((state) => state.auth);

  return (
    <>
      <nav className={style.nav}>
        <h2 className={style.title}>Keep</h2>
        <NavBtn src={"/img/light-bulb.svg"} text={"Notes"} nav={""} />
        {/* tag는 따로 map으로 불어날 예정 */}
        {/* <NavBtn src={"/img/tag.svg"} text={"Coding"} />
        <NavBtn src={"/img/tag.svg"} text={"Coding"} />
        <NavBtn src={"/img/tag.svg"} text={"Coding"} /> */}
        {/* <NavBtn src={"/img/pencil.svg"} text={"Edit Note"} /> */}
        <NavBtn src={"/img/box.svg"} text={"Archive"} nav={"archive"} />
        <NavBtn src={"/img/trash-can.svg"} text={"Trash"} nav={"trash"} />
      </nav>
    </>
  );
}
