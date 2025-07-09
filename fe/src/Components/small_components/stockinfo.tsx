import { useState } from "react";
import { InfoIcon } from "../../icons/info";


export default function StockInfo() {
  const[showInfo, setShowInfo] = useState(false);
  return (
    <>
      <div className="bg-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm h-64 overflow-y-auto">
        <div className="flex flex-row justify-between items-center pb-2">
          <h2 className="text-lg font-semibold mb-2 pt-2">Stocks Overview</h2>
          <button onClick={() => setShowInfo(!showInfo)} title="Important Info">
            <InfoIcon />
          </button>
          {showInfo && (
            <div className="absolute z-25 mt-2 left-0 w-56 bg-white text-black text-sm p-3 rounded-2xl shadow-lg border border-gray-200 translate-y-8 translate-x-2">
              Stock prices are fetched periodically for insights. Use platforms
              like Groww for real-time data.
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-2" />
        <div className="text-sm text-gray-300 space-y-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <p key={i}>
              {i % 2 === 0 ? "📈" : "📉"} Stock #{i + 1} - ${100 + i * 5} (
              {i % 2 === 0 ? "+" : "-"}
              {(i % 10) / 10}%)
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
