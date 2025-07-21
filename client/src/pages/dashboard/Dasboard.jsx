import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../../lib/auth";
import fetcher from "../../lib/api";
import { useState } from "react";

import Overview from "./Overview";

export default function Dashboard() {
  const [overview, setOverview] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = "/dashboard/overview";
      const res = await fetcher(endpoint);
      const user = getCurrentUser();
      res.user = user;
      setOverview(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Overview userData={overview} />
        <h1 className="text-2xl font-jetbrains text-teal-300"><span className="text-teal-400 mr-0.5">#</span>Projects</h1>
      </div>

    </>
  );
}
