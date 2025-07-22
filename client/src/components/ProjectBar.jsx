import { useEffect, useState } from "react";
import fetcher from "../lib/api";

const ProjecsBar = function ({ collapsed }) {
  const [collapsed, setCollapsed] = useState(collapsed);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function loadData() {
      const res = await fetcher("/projects");
      const sorted = res.sort((a, b)=>{
        if (a.pinned !== b.pinned){
            return a.pinned - b.pinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      setProjects(sorted);
    }
  });
};
