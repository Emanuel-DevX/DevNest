import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dasboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthCallback from "./pages/AuthCallback";
import SideNavbar from "./components/SideNavbar";
function App() {
  const location = useLocation();

  return (
    <>
      <div className={` antialiased max-w-[90rem] mx-auto`}>
        <Navbar />
        {location.pathname === "/" ? (
          <Home />
        ) : (
          <main className=" flex overflow-hidden">
            <SideNavbar />
            <div className="ml-64 p-2">
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
