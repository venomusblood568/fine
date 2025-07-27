import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTokenExpiryRedirect from "../customhook/expirytoken";
import type { LucideIcon } from "lucide-react";
import { LogOut, LayoutDashboard, Landmark, ChartNoAxesCombined, User } from "lucide-react";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }
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
        className={`fixed top-0 left-0 h-screen w-64 border-r-2 text-white flex flex-col px-6 py-6 space-y-10 transform
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
          <SidebarLink icon={LayoutDashboard}  label="Dashboard" onclick={() => navigate("/dashboard")}/>
          <SidebarLink icon={Landmark} label="Money" onclick={() => navigate("/money")}/>
          <SidebarLink icon={ChartNoAxesCombined} label="Stocks" onclick={() => navigate("/stocks")}/>
          <SidebarLink icon={User} label="Profile" onclick={() => navigate("/profile")}/>
          
        </nav>

        {/* Footer */}
        <div className="flex-grow" />
        <div className="hover:text-red-500">
          <SidebarLink 
            icon={LogOut}
            label="Logout" 
            onclick={handleLogout} 
          />
        </div>
      </div>
    </>
  );
}

type SidebarProp = {
  label: string;
  onclick?: () => void;
  icon?: LucideIcon;
};

function SidebarLink({ label, onclick, icon: Icon }: SidebarProp) {
  useTokenExpiryRedirect();
  return (
    <button
      onClick={onclick}
      className="flex items-center space-x-3 text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
}
