import Aurora from "../assets/bg_arora";

import CustomDock from "../assets/custom_dock";

export default function Stocks() {
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
      <h1 className="relative z-10 text-white text-3xl p-4">Stocks Page</h1>

      {/* Dock */}
      <CustomDock />
    </div>
  );
}
