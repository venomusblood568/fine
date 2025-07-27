import { useEffect, useState } from "react";
import "./App.css";
import { FineIcon } from "./icons/fine";
import { Popup } from "./Components/popup";
import { useNavigate } from "react-router-dom";
import Aurora from "./assets/bg_arora";
import { motion } from "framer-motion";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const checkbackend = async () => {
      try {
        const res = await fetch(
          "https://fine-fwhx.onrender.com/api/test/health"
        );
        if (res.ok) {
          setBackendReady(true);
        } else {
          throw new Error("Backend Not Ready");
        }
      } catch {
        setTimeout(checkbackend, 3000);
      }
    };
    checkbackend();
  }, []);

  if (!backendReady) {
    return (
      <div className="loading-screen flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-lg mb-2">Waking up our sleepy server...</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm text-gray-400"
          >
            Almost there! ✨
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex space-x-1 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white min-h-screen font-spacemono">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#2ded40", "#3a29ff"]}
          blend={0.31}
          amplitude={0.5}
          speed={0.6}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-wider mb-4">
          F.I.N.E
        </h1>
        <p className="text-base sm:text-xl text-gray-400 mb-6">
          <span className="typewriter text-white">
            Finance Isn't Nearly Easy
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 w-full sm:w-auto bg-white text-black font-semibold rounded-xl hover:bg-gray-300 transition"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 w-full sm:w-auto bg-white text-black font-semibold rounded-xl hover:bg-gray-300 transition"
          >
            Login
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl px-2"
        >
          {[
            { title: "Smart Tracking", desc: "Monitor expenses effortlessly" },
            {
              title: "Budget Goals",
              desc: "Set and achieve financial targets",
            },
            { title: "Insights", desc: "Understand your spending patterns" },
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-left hover:bg-white/10 transition"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Icon */}
      <div
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 left-6 p-2 bg-black/60 rounded-full hover:bg-black transition-all cursor-pointer z-20"
      >
        <FineIcon />
      </div>

      {/* Popup Component */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-lg font-bold">Hi, Sam this side 👋</h2>
        <p className="mt-4 text-sm">
          This is one of my projects built to help me manage my funds better. I
          hope you find it helpful too!
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <a
            href="https://gourav-duck.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-red-500 border-2 px-4 py-2 rounded-xl text-white hover:text-black hover:bg-red-500 transition"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/venomusblood568"
            target="_blank"
            rel="noopener noreferrer"
            className="border-blue-500 border-2 px-4 py-2 rounded-xl text-white hover:text-black hover:bg-blue-500 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/gourav-anand-jha/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-yellow-500 border-2 px-4 py-2 rounded-xl text-white hover:text-black hover:bg-yellow-500 transition"
          >
            LinkedIn
          </a>
        </div>
      </Popup>
    </div>
  );
}

export default App;
