import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/sidebar";
import Account from "./small_components/account";
import Expense from "./small_components/expense";
import StockInfo from "./small_components/stockinfo";
import WeeklyGraph from "./small_components/weeklygraph";

export default function Dashboard() {
  return (
    <div className="bg-black text-white w-screen h-screen  font-mono flex">
      <CustomBg />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto px-6 py-15">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* Today’s Transactions (Middle Column) */}
          <Expense />
          {/* Right Section (Weekly + Reports) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Weekly Report */}
            <WeeklyGraph />

            {/* Bottom: Account + Stocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Account />
              <StockInfo />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
