import { useState } from "react";

const SideNavbar = function () {
  const [activePage, setActivepage] = useState(null);

  return (
    <>
      <nav className="max-h-[90vh] h-screen w-64 bg-zinc-950 border-r border-teal-300/50  fixed">
        <div className="h-screen fixed overflow-hidden">Side Navbar</div>
      </nav>
    </>
  );
};

export default SideNavbar;
