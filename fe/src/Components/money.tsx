import CustomBg from "../assets/custom_bg";
import CustomDock from "../assets/custom_dock";

export default function Money() {
  return (
    <div
      className="bg-black min-h-screen relative pb-24"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <CustomBg/>

      {/* Page Content */}
      <h1 className="relative z-10 text-white text-3xl p-4">Money Page</h1>

      {/* Dock */}
      <CustomDock />
    </div>
  );
}
