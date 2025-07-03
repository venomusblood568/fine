import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/sidebar";
import Expense from "./small_components/expense";

export default function Dashboard() {
  return (
    <div
      className="bg-black min-h-screen font-mono overflow-x-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <CustomBg />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <Expense />
      </div>
    </div>
  );
}
