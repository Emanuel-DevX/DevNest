import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dasboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthCallback from "./pages/AuthCallback";
import SideNavbar from "./components/SideNavbar";
import Tasks from "./pages/tasks/Tasks";
import Project from "./pages/project/Project";
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
            <div
              className={`p-2 w-full ${expand ? "ml-16" : "md:ml-48 ml-16"}`}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/project/:id" element={<Project />}/>
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
