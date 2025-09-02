import React from "react";
import NavBtn from "./NavBtn";
import style from "./Nav.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const { notes, status } = useSelector((state) => state.auth);

  // 일반 리다이렉트
  // const handleNav = (nav) => {
  //   navigate(`/${nav}`);
  // };

  return (
    <>
      <nav className={style.nav}>
        <h2 className={style.title}>Keep</h2>
        <NavBtn src={"/img/light-bulb.svg"} text={"Notes"} />
        {/* tag는 따로 map으로 불어날 예정 */}
        <NavBtn src={"/img/tag.svg"} text={"Coding"} />
        <NavBtn src={"/img/tag.svg"} text={"Coding"} />
        <NavBtn src={"/img/tag.svg"} text={"Coding"} />
        {/* <NavBtn src={"/img/pencil.svg"} text={"Edit Note"} /> */}
        <NavBtn src={"/img/box.svg"} text={"Archive"} />
        <NavBtn src={"/img/trash-can.svg"} text={"Trash"} />
      </nav>
    </>
  );
}
