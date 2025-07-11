import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Aurora from "../assets/bg_arora";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setshowPassword((prev) => !prev);
  const redirecthome = () => navigate("/");
  const redirectsignup = () => navigate("/signup");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fine-fwhx.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

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
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="border border-gray-600 bg-black/30 backdrop-blur p-6 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold tracking-wider mb-4 text-center">
            Login
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                className="w-1/2 mt-4 bg-secondary hover:bg-gray-900 text-white py-2 rounded-r-md font-semibold transition-colors"
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
