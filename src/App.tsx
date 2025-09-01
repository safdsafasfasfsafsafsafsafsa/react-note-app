import "./App.css";

import { Outlet, Routes, Route } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <Nav /> */}
      <Outlet />
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  );
}
