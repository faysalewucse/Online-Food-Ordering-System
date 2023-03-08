import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ResRequests from "./ResRequests";
import SideBar from "./Sidebar";

export default function Panel() {
  const [path, setPath] = useState("dashboard");

  return (
    <div>
      {localStorage.getItem("loggedIn") ? (
        <div style={{ fontFamily: "Poppins" }} className="flex">
          <SideBar setPath={setPath} />
          <div className="p-12 flex-grow">
            {path === "dashboard" ? <div>DashBoard</div> : <ResRequests />}
          </div>
        </div>
      ) : (
        <Navigate to="/admin-auth" />
      )}
    </div>
  );
}
