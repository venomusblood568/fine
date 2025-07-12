import { useEffect, useState } from "react";
import "./App.css";
import { FineIcon } from "./icons/fine";
import { Popup } from "./Components/popup";
import { useNavigate } from "react-router-dom";
import Aurora from "./assets/bg_arora"; 

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const checkbackend = async() => {
      try {
        const res = await fetch(
          "https://fine-fwhx.onrender.com/api/test/health"
        );
        if(res.ok){
          setBackendReady(true);
        }else{
          throw new Error("Backend Not Ready");
        }
      } catch{
        setTimeout(checkbackend,3000);
      }
    }
    checkbackend();

  },[])

  if(!backendReady){
    return (
      <div className="loading-screen flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p>Waking up our sleepy server ... </p>
        <>almost there!</>
      </div>
    );
  }

  return (
    <div
      className="relative bg-black text-white min-h-screen"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#2ded40", "#3a29ff"]}
          blend={0.31}
          amplitude={0.5}
          speed={0.6}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4">
          F.I.N.E
        </h1>
        <p className="text-lg font-extralight md:text-xl text-gray-400">
          <span className="typewriter font-spacemono text-white text-xl">
            Finance Isn’t Nearly Easy
          </span>
        </p>
        <div className="flex gap-8">
          <button
            onClick={() => navigate("/signup")}
            className="mt-6 px-6 py-2 rounded-2xl bg-white text-black font-semibold hover:bg-gray-300 transition duration-300 hover:cursor-pointer"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-2 rounded-2xl bg-white text-black font-semibold hover:bg-gray-300 transition duration-300 hover:cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>

      {/* Floating Icon */}
      <div
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 left-6 text-white p-2 rounded-full shadow-xl hover:bg-black transition-all hover:cursor-pointer z-20"
      >
        <FineIcon />
      </div>

      {/* Popup Component */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2>Hi, Sam this side 👋</h2>
        <br />
        <p>
          This is one of my projects built to help me manage my funds better. I
          hope you find it helpful too!
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
  );
}

export default App;
