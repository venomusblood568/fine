import { useState } from "react";
import "./App.css";
import { FineIcon } from "./icons/fine";
import { Popup } from "./Components/popup";
import { useNavigate } from "react-router-dom";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Correct place

  return (
    <div
      className="bg-black text-white min-h-screen"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4">
            F.I.N.E
          </h1>
          <p className="text-lg font-extralight md:text-xl text-gray-400">
            <span className="typewriter font-spacemono text-white text-xl">
              Finance Isn’t Nearly Easy
            </span>
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-2 rounded-2xl bg-white text-black font-semibold hover:bg-gray-300 transition duration-300 hover:cursor-pointer"
          >
            Login
          </button>
        </div>

        <div
          onClick={() => setIsPopupOpen(true)}
          className="fixed bottom-6 left-6 text-white p-2 rounded-full shadow-xl hover:bg-black transition-all hover:cursor-pointer"
        >
          <FineIcon />
        </div>

        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <h2>Hi, Sam this side 👋</h2>
          <br />
          <p>
            This is one of my projects built to help me manage my funds better.
            I hope you find it helpful too!
          </p>
          <br />
          <div className="flex items-center justify-center gap-2.5">
            <a
              href="https://gourav-duck.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-red-500 rounded-2xl border-2 px-4 py-2 text-white hover:text-black transition duration-300"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/venomusblood568"
              target="_blank"
              rel="noopener noreferrer"
              className="border-blue-500 rounded-2xl border-2 px-4 py-2 text-white hover:text-black transition duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gourav-anand-jha/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-yellow-500 rounded-2xl border-2 px-4 py-2 text-white hover:text-black transition duration-300"
            >
              LinkedIn
            </a>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default App;
