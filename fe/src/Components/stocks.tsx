import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/Sidebar";

export default function Stocks() {
  return (
    <div
      className="bg-black min-h-screen font-mono"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <CustomBg />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 px-6 py-15">
          <h1 className="text-white text-3xl font-bold mb-4">Stocks Page</h1>

          {/* You can add your page sections here */}
          <p className="text-gray-400 text-sm">
            Track, plan, and manage your funds here.
          </p>
        </main>
      </div>
    </div>
  );
}
