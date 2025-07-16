import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/dashboard/Dashboard"
function App() {
  const location = useLocation();

  const isWindowRoute = location.pathname !== "/";
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white overflow-hidden relative">
        {location.pathname === "/" && <Home />}
        {isWindowRoute && <AppWindow />}
        <AppLauncherNavbar />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/me" element={null} />
          <Route path="/projects" element={null} />
          <Route path="/chat" element={null} />
          <Route path="/terminal" element={null} />
          <Route path="/tech" element={null} />

          <Route path="/blog" element={null} />
          <Route path="/blog/:slug" element={<AppWindow />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
