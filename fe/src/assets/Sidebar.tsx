import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 border-r-2 text-white flex flex-col px-6 py-8 space-y-10 transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    transition-transform duration-300 ease-in-out z-40
    bg-gray-900 md:bg-transparent md:relative md:translate-x-0`}
      >
        {/* Title */}
        <div className="flex flex-col tracking-wide space-y-4 py-10 px-3">
          <h1 className="text-2xl font-bold text-white">F.I.N.E</h1>
        </div>

        {/* Links */}
        <nav className="flex flex-col space-y-4 text-sm">
          <SidebarLink label="Dashboard" />
          <SidebarLink label="Money" />
          <SidebarLink label="Stocks" />
          <SidebarLink label="Profile" />
          <SidebarLink label="Settings" />
        </nav>

        {/* Footer */}
        <div className="flex-grow" />
        <div className="hover:text-red-500">
          <SidebarLink label="Logout" />
        </div>
      </div>
    </>
  );
}
function SidebarLink({ label }: { label: string }) {
  return (
    <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full">
      {label}
    </button>
  );
}
