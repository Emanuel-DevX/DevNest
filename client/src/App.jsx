import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/Navbar";
function App() {
  const location = useLocation();

  return (
    <>
      <div
        className={` antialiased max-w-[90rem] mx-auto`}
      >
        <Navbar />

        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
