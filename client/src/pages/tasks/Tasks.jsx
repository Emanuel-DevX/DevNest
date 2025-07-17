import { useState } from "react";
import MonthView from "./MonthView";
const views = {
  daily: {},
  monthly: { component: <MonthView /> },
};
const Tasks = function () {
  const [view, setView] = useState("monthly");

  return (
    <>
      <div className="flex justify-between pb-5">
        <h1>{view.charAt(0).toUpperCase() + view.slice(1) +" "}Tasks</h1>
        <button onClick={() => setView("monthly")} className="">
          {view}{" "}
        </button>
      </div>
      {views[view].component}
    </>
  );
};

export default Tasks;
