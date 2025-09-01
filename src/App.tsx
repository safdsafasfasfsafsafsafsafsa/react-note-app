import "./App.css";
import Nav from "./components/Nav";
import { Outlet, Routes, Route } from "react-router-dom";

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
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  );
}
