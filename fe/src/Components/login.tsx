import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const redirecthome = () => {
    navigate("/")
  }

  return (
    <div>
      <div
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="bg-black text-white min-h-screen flex items-center justify-center"
      >
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
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="mt-4 bg-primary hover:bg-gray-700 text-white py-2 rounded-md font-semibold transition-colors"
            >
              Submit
            </button>
            <div className="flex w-full gap-3 rounded-xl">
              <button
                onClick={redirecthome}
                type="button"
                className="w-1/2 mt-4 bg-secondary hover:bg-gray-900 text-white py-2 rounded-l-md font-semibold transition-colors"
              >
                Home
              </button>
              <button
                type="button"
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