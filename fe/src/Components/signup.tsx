import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aurora from "../assets/bg_arora";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);

  const redirecthome = () => {
    navigate("/");
  };

  const redirectlogin = () => {
    navigate("/login");
  };

  const togglePassword = () => {
    setshowPassword((prev) => !prev);
  };

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fine-fwhx.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            username: userName,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.error || "Signup Failed");
      }
    } catch (error) {
      alert("Server error");
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="text-white bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8"
      >
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#3A29FF", "#2ded40", "#3a29ff"]}
            blend={0.31}
            amplitude={0.5}
            speed={0.6}
          />
        </div>
        <div className="relative z-10 border border-gray-700 bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-sm">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider mb-6 text-center text-white">
            Sign Up
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              className="bg-transparent border border-gray-600 text-white placeholder-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="bg-transparent border border-gray-600 text-white placeholder-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              className="bg-transparent border border-gray-600 text-white placeholder-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="bg-transparent border border-gray-600 text-white placeholder-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
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
              className="mt-4 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-md font-semibold transition-colors"
            >
              Submit
            </button>
            <div className="flex w-full gap-3 flex-col sm:flex-row">
              <button
                type="button"
                onClick={redirecthome}
                className="w-full sm:w-1/2 mt-2 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-md sm:rounded-l-md font-semibold transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={redirectlogin}
                className="w-full sm:w-1/2 mt-2 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md sm:rounded-r-md font-semibold transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
