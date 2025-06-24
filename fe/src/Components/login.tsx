import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Aurora from "../assets/bg_arora"; 
export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  
  const redirecthome = () => {
    navigate("/")
  }
  const togglePassword = () => {
    setshowPassword((prev) => !prev)
  }

  const redirectsignup = () => {
    navigate("/signup")
  }

  return (
    <div style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="absolute bg-black inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#2ded40", "#3a29ff"]}
          blend={0.31}
          amplitude={0.5}
          speed={0.6}
        />
      </div>
      <div className=" text-white min-h-screen flex items-center justify-center">
        <div className="border border-gray-600 bg-black/30 backdrop-blur p-6 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold tracking-wider mb-4 text-center">
            Login
          </h1>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="bg-transparent border border-gray-500 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 bg-primary hover:bg-gray-700 text-white py-2 rounded-md font-semibold transition-colors cursor-pointer"
            >
              Submit
            </button>
            <div className="flex w-full gap-3 rounded-xl">
              <button
                onClick={redirecthome}
                type="button"
                className="w-1/2 mt-4 bg-secondary hover:bg-gray-900 text-white py-2 rounded-l-md font-semibold transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={redirectsignup}
                className="w-1/2 mt-4 bg-secondary hover:bg-gray-900 text-white py-2 rounded-r-md font-semibold transition-colors "
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}