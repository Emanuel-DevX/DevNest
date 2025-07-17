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
  const [expand, setExpand] = useState(false);
  const publicPaths = ["/", "/auth/callback"];
  const isPublic = publicPaths.includes(location.pathname);

  return (
    <>
      <div className={` antialiased max-w-[90rem] mx-auto`}>
        <Navbar />
        {isPublic ? (
          location.pathname === "/" ? (
            <Home />
          ) : (
            <AuthCallback />
          )
        ) : (
          <main className=" flex overflow-hidden">
            <SideNavbar setExpand={setExpand} />
            <div className={`p-2 min-w-[80rem] ${expand ? "ml-16" : "md:ml-48 ml-16"}`}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
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
