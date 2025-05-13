import Signin_btn from "./components/signin_btn";
import Signup_btn from "./components/signup_btn";

export default function Home() {
  return (
    <div style={{ fontFamily: "var(--font-dm-mono)" }}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">F.I.N.E</h1>
        <h5 className="text-xl">Finance Isn’t Nearly Easy</h5>
        <div className="flex flex-row items-center justify-center">
          <Signin_btn />
          <Signup_btn />
        </div>
      </div>
    </div>
  );
}
