"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    password: "",
  });
  const onSignup = async () => {};
  
  const onhomepage = () => {
    router.push("/");
  };

  const onsigninpage = () => {
    router.push("/signin");
  };
  return (
    <div>
      <div
        style={{ fontFamily: "var(--font-dm-mono)" }}
        className="bg-noise text-white min-h-screen flex items-center justify-center"
      >
        <div className="border border-gray-600 bg-black/30 backdrop-blur p-6 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold tracking-wider mb-4 text-center">
            Sign Up
          </h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                id="name"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              onClick={onSignup}
              className="mt-4 bg-secondary hover:bg-secondary-hover text-white py-2 rounded-md font-semibold transition-colors"
            >
              Submit
            </button>
            <div className="flex w-full gap-3 rounded-xl">
              <button
                type="button"
                onClick={onhomepage}
                className="w-1/2 mt-4 bg-primary hover:bg-secondary-hover text-white py-2 rounded-l-md font-semibold transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={onsigninpage}
                className="w-1/2 mt-4 bg-primary hover:bg-secondary-hover text-white py-2 rounded-r-md font-semibold transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
