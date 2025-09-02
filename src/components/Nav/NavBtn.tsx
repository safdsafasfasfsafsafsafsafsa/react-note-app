import React from "react";
import style from "./NavBtn.module.css";

import { useNavigate } from "react-router-dom";

interface NavBtnProps {
  src: string;
  text: string;
  nav: string;
}

export default function NavBtn({ src, text, nav }: NavBtnProps) {
  const navigate = useNavigate();

  const handleNav = (nav: string) => {
    navigate(`/${nav}`);
  };

  return (
    <div className={style.btn} onClick={() => handleNav(nav)}>
      <img src={src} alt="img" />
      <p>{text}</p>
    </div>
  );
}
