import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../lib/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="h-screen">welcome to dashboard</div>
      <div className="h-screen">what</div>
    </>
  );
}
