import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../utils/Error";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  //   const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    setError("");
    // setLoading(true);
    if (
      email === process.env.REACT_APP_ADMIN_EMAIL.toString() &&
      password === process.env.REACT_APP_ADMIN_PASSWORD.toString()
    ) {
      localStorage.setItem("loggedIn", true);

      navigate("/admin-panel");
    } else {
      setError("Email or Password is not valid");
      setTimeout(() => {
        setError();
      }, 2000);
    }
  };
  return (
    <div className="bg-[#1b1e21]">
      <div className="max-w-7xl mx-auto flex justify-center items-center min-h-screen">
        <div className="lg:w-1/4 text-center">
          <h2 className="mb-5 text-white">Admin LOGIN</h2>
          <form className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Email"
              value={email}
              className="p-2 rounded border border-black"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="p-2 rounded border border-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={loginHandler}
              className="bg-green-600 text-white p-2 rounded-md"
            >
              Login
            </button>
          </form>
          <Error msg={error} />
        </div>
      </div>
    </div>
  );
}
