import { Routes, Route, useLocation } from "react-router-dom";
import { Manrope } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});
import Home from "./pages/Home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/Navbar";
function App() {
  const location = useLocation();

  return (
    <>
      <div
        className={`${manrope.variable} ${jetbrainsMono.variable} antialiased max-w-[90rem] mx-auto`}
      >
        <Navbar />
        {location.pathname === "/" && <Home />}

        <Routes>
          <Route path="/" element={null} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
