"use client";
import Fine from "@/public/icons/fine";
import Signin_btn from "./components/signin_btn";
import Signup_btn from "./components/signup_btn";
import { useState } from "react";
import Popup from "./components/popup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="bg-noise text-white min-h-screen">
      <div style={{ fontFamily: "var(--font-dm-mono)" }}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4">
            F.<span className="text-[var(--color-secondary)]">I.</span>N.E
          </h1>
          <p className="text-lg font-extralight md:text-xl text-gray-400">
            <span className="typewriter">Finance Isn’t Nearly Easy</span>
          </p>

          <div className="flex flex-row items-center justify-center">
            <Signin_btn />
            <Signup_btn />
          </div>
        </div>
        {/* cirle */}
        <div
          onClick={() => setIsPopupOpen(true)}
          className="fixed bottom-6 left-6  text-white p-2 rounded-full shadow-xl hover:bg-black transition-all hover:cursor-pointer"
        >
          <Fine />
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
              className="border-red-500 rounded-2xl border-2 px-4 py-2 text-white
               hover:bg-blue-50 hover:text-black transition duration-300"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/venomusblood568"
              target="_blank"
              rel="noopener noreferrer"
              className="border-blue-500 rounded-2xl border-2 px-4 py-2 text-white 
              hover:bg-blue-50 hover:text-black transition duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gourav-anand-jha/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-yellow-500 rounded-2xl border-2 px-4 py-2 text-white
               hover:bg-blue-50 hover:text-black transition duration-300"
            >
              LinkedIn
            </a>
          </div>
        </Popup>
      </div>
    </div>
  );
}
