import Aurora from "../assets/bg_arora";
import Dock from "../assets/dock";
import {
  VscHome,
  VscAccount,
  VscSettingsGear,
  VscExport,
} from "react-icons/vsc";

export default function Dashboard() {
  const items = [
    {
      icon: <VscHome size={18} className="text-white" />,
      label: "Home",
      onClick: () => alert("Home!"),
    },
    {
      icon: <VscAccount size={18} className="text-white" />,
      label: "Profile",
      onClick: () => alert("Profile!"),
    },
    {
      icon: <VscSettingsGear size={18} className="text-white" />,
      label: "Settings",
      onClick: () => alert("Settings!"),
    },
    {
      icon: <VscExport size={18} className="text-white" />,
      label: "Logout",
      onClick: () => alert("Logout!!"),
    },
  ];

  return (
    <div
      className="bg-black min-h-screen relative pb-24"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {/* Aurora Background */}
      <div className="absolute bg-transparent inset-0 z-0 opacity-30">
        <Aurora
          colorStops={["#3A29FF", "#2ded40", "#3a29ff"]}
          blend={0.31}
          amplitude={0.5}
          speed={0.6}
        />
      </div>

      {/* Page Content */}
      <h1 className="relative z-10 text-white text-3xl p-4">Hi, User!</h1>

      {/* Dock at the bottom fixed */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 ">
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
}
