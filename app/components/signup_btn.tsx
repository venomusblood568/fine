import Link from "next/link";

export default function Signup_btn() {
  return (
    <div>
      <Link href="signup">
        <div className="bg-transparent hover:bg-secondary px-6 py-2 p-2 m-2 text-xl rounded-full text-white font-semibold shadow-md cursor-pointer">
          Sign Up
        </div>
      </Link>
    </div>
  );
}
