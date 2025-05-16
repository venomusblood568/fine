import Link from "next/link";

export default function Signin_btn() {
  return (
    <div>
      <Link href="signin">
        <div className="bg-transparent hover:bg-primary px-6 py-2 m-2 text-xl rounded-full text-white font-semibold shadow-md cursor-pointer transition-colors duration-300">
          Sign In
        </div>
      </Link>
    </div>
  );
}
