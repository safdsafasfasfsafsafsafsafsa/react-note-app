import React from "react";
import style from "./NavBtn.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface NavBtnProps {
  src: string;
  text: string;
}

export default function NavBtn({ src, text }: NavBtnProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const { notes, status } = useSelector((state) => state.auth);

  // 일반 리다이렉트
  // const handleNav = (nav) => {
  //   navigate(`/${nav}`);
  // };

  return (
    <div className={style.btn}>
      <img src={src} alt="img" />
      <p>{text}</p>
    </div>
  );
}
