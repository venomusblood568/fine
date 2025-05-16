import Link from "next/link";

export default function Signin_btn() {
  return (
    <div>
      <Link href="signin">
        <div className="bg-primary px-6 py-2 p-2 m-2 text-xl rounded-full text-white font-semibold shadow-md cursor-pointer">
          Sign In
        </div>
      </Link>
    </div>
  );
}
