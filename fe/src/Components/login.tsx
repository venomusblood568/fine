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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
      {/* Aurora BG */}
      <div className="absolute bg-black inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#2ded40", "#3a29ff"]}
          blend={0.31}
          amplitude={0.5}
          speed={0.6}
        />
      </div>

      {/* Main container */}
      <div className="text-white min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-black/30 backdrop-blur border border-gray-600 p-6 sm:p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider mb-6 text-center">
            Login
          </h1>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border border-gray-500 px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Submit
            </button>

            <div className="flex gap-4 mt-4">
              <button
                onClick={redirecthome}
                type="button"
                className="w-1/2 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-medium"
              >
                Home
              </button>
              <button
                onClick={redirectsignup}
                type="button"
                className="w-1/2 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-medium"
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
