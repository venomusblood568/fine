import Signin_btn from "./components/signin_btn";
import Signup_btn from "./components/signup_btn";

export default function Home() {
  return (
    <div className="bg-noise text-white min-h-screen">
      <div style={{ fontFamily: "var(--font-dm-mono)" }}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4">
            F.<span className="text-[var(--color-secondary)]">I.</span>N.E
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            <span className="typewriter">Finance Isn’t Nearly Easy</span>
          </p>

          <div className="flex flex-row items-center justify-center">
            <Signin_btn />
            <Signup_btn />
          </div>
        </div>
      </div>
    </div>
  );
}
