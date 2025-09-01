import React from "react";
import "../styles/Reset.css";
import "./Nav.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const { notes, status } = useSelector((state) => state.auth);

  // 일반 리다이렉트
  const handleNav = (nav) => {
    navigate(`/${nav}`);
  };

  return (
    <>
      <nav className="nav">
        <img
          src="/img/logo.png"
          alt="shop logo"
          className="nav__logo"
          onClick={() => handleNav("")}
        />
        <div className="img-right">
          {status === "succeeded" ? (
            <p className="nav__login-email" onClick={handleCartTest}>
              {user.email}
            </p>
          ) : (
            <></>
          )}
          <img
            src="/img/cart.svg"
            alt="cart"
            className="nav__cart"
            // onClick={() => handleNavCheck("cart")}
            onClick={handleModalCheck}
          />
          <img
            src="/img/person.svg"
            alt="person"
            className="nav__person"
            onClick={() => handleNav("login")}
          />
          <img
            src="/img/login.svg"
            alt="login"
            className="nav__log-in-out"
            onClick={handleClickLogout}
          />
        </div>
      </nav>
      {isOpen && <Modal />}
    </>
  );
}
