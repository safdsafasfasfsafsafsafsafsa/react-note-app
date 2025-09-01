import "./App.css";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { loadNotesFromLocalStorage } from "./store/asyncThunks/localStorageThunk";

import Nav from "./components/Nav";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";

import NotePage from "./pages/NotePage/index";
import ArchivePage from "./pages/ArchivePage/index";
import TagPage from "./pages/TagPage/index";
import TrashPage from "./pages/TrashPage/index";

const Layout = () => {
  return (
    <>
      {/* <div className="leftSectionWrapper"> */}
      <Nav />
      {/* </div> */}
      {/* <div className="rightSectionWrapper"> */}
      <Outlet />
      {/* </div> */}
    </>
  );
};

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.main.status);

  useEffect(() => {
    dispatch(loadNotesFromLocalStorage());
  }, [dispatch]);

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NotePage />}></Route>
          <Route index element={<Navigate to="/" />}></Route>
          <Route index element={<TagPage />}></Route>
          <Route index element={<ArchivePage />}></Route>
          <Route index element={<TrashPage />}></Route>
        </Route>
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  );
}
