import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dasboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthCallback from "./pages/AuthCallback";
import SideNavbar from "./components/SideNavbar";
function App() {
  const location = useLocation();
  const [expand, setExpand] = useState(false)

  return (
    <>
      <div className={` antialiased max-w-[90rem] mx-auto`}>
        <Navbar />
        {location.pathname === "/" ? (
          <Home />
        ) : (
          <main className=" flex overflow-hidden">
            <SideNavbar setExpand={setExpand} />
            <div className={`p-2 ${expand ? "ml-16" :"ml-48"}`}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Routes>
            </div>
          </main>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
