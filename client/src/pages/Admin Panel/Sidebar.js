import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar({ setPath }) {
  const navigate = useNavigate();

  const items = [
    {
      name: "Dashboard",
      icon: "fa-chart-line",
      path: "dashboard",
    },
    {
      name: "Requests",
      icon: "fa-bell",
      path: "res-requests",
    },
  ];
  const items2 = [
    {
      name: "Logout",
      icon: "fa-arrow-right-from-bracket",
    },
  ];

  const logoutHandler = () => {
    localStorage.removeItem("loggedIn");
    navigate("/admin-auth");
  };

  return (
    <div>
      <div className="h-screen bg-[#1b1e21] p-10 text-white">
        <div className="text-center font-bold text-xl my-10">
          <i className="fa-solid fa-camera bg-black h-20 w-20 rounded-full p-7" />
          <p className="mt-2">FoodsHub</p>
        </div>
        <ul className="text-xl flex flex-col gap-2">
          {items.map((item, index) => {
            return (
              <h6
                key={index}
                to={item.path}
                onClick={() => setPath(item.path)}
                className="flex items-center justify-between cursor-pointer hover:bg-white hover:text-black p-3 rounded-md transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span className="">{item.name}</span>
                </div>
                <i className="fa-solid fa-chevron-right ml-10"></i>
              </h6>
            );
          })}
          <hr className="border border-gray-800" />
          {items2.map((item, index) => {
            return (
              <div
                key={index}
                onClick={logoutHandler}
                className="flex items-center justify-between cursor-pointer hover:bg-white hover:text-black p-3 rounded-md transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.name}</span>
                </div>
                <i className="fa-solid fa-chevron-right ml-10"></i>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
