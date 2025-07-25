import { useState } from "react";
import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/Sidebar";
import {
  TrendingUp,
  IndianRupee,
  Percent,
  Plus,
  Eye,
  EyeOff,
  X
} from "lucide-react";

export default function Stocks() {
  const holdings = [
    {
      stockName: "Hindustan Unilever Limited",
      symbol: "HINDUSTAN UNILEVER LIMITED",
      exchange: "NSE",
      quantity: 10,
      invested: 2525,
      purchaseDate: "2024-06-15T00:00:00.000Z",
      notes: "Added for defensive exposure in volatile market",
      currentPrice: "20",
      allocation:"",
    },
  ];
  const [showtotal, setShowtotal] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-black min-h-screen font-mono flex w-full overflow-x-hidden">
      <CustomBg />
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        {showPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center">
            <div className="bg-[#393E46] rounded-xl shadow-2xl w-full max-w-lg border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600">
                <h2 className="text-2xl font-semibold text-white">
                  Add Stocks
                </h2>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <form className="px-6 py-4 space-y-4 text-white">
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Stock Name"
                    className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Symbol"
                    className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      className="input-style border-b border-gray-300 bg-transparent text-white"
                      defaultValue=""
                    >
                      <option value="" disabled className="text-gray-400">
                        Select Exchange
                      </option>
                      <option value="NSE" className="text-black">
                        NSE
                      </option>
                      <option value="BSE" className="text-black">
                        BSE
                      </option>
                    </select>

                    <input
                      type="number"
                      placeholder="Quantity"
                      className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Invested"
                      className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                    />
                    <input
                      type="date"
                      className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Notes"
                    className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <main className="flex-1 px-6 py-15 z-10 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6">
            <div>
              <h1 className="text-white text-3xl font-bold mb-1 z-10">
                My Portfolio
              </h1>
              <p className="text-gray-400 text-sm">
                Track, plan, and manage your investments with valuable insights.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowPopup(true)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition"
              >
                <Plus />
                Add Stock
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-2xl">Total Value</span>
                </div>
                <button
                  onClick={() => setShowtotal(!showtotal)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  {showtotal ? (
                    <Eye className="w-5 h-5 text-white" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              <p className="flex text-white text-4xl font-bold gap-2">
                <p className="text-emerald-500">₹ </p>
                {showtotal ? `3,214` : "••••••"}
              </p>
            </div>

            {/* Summary Section */}
            <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              {/* Total Cost */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-400 text-sm">Total Cost</span>
                  </div>
                  <button
                    onClick={() => setShowCost(!showCost)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {showCost ? (
                      <Eye className="w-5 h-5 text-white" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
                <p className="text-white text-2xl font-bold">
                  {showCost ? `3,160` : "••••••"}
                </p>
              </div>

              {/* Gain/Loss */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400 text-sm">Total Gain/Loss</span>
                </div>
                <p className="text-white text-2xl font-bold">₹000</p>
              </div>

              {/* Return % */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400 text-sm">Return %</span>
                </div>
                <p className="text-white text-2xl font-bold">231%</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold py-5">Holdings</h2>

            {/* Desktop Table */}
            <div className="hidden md:block  border border-gray-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                        Stock Name
                      </th>
                      <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                        Symbol
                      </th>
                      <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                        Shares
                      </th>
                      <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                        Avg Price
                      </th>
                      <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                        Current Price
                      </th>

                      <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                        Last Purchase Date
                      </th>
                      
                      <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {holdings.map((holding) => {
                      return (
                        <tr
                          key={holding.stockName}
                          className="hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-white">
                            {holding.stockName}
                          </td>
                          <td className="px-6 py-4 text-white">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white">
                                {holding.symbol}
                              </span>
                              <span className="text-xs text-gray-400">
                                {holding.exchange}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-white">
                            {holding.quantity}
                          </td>
                          <td className="px-6 py-4 text-white">
                            ${holding.invested}
                          </td>
                          <td className="px-6 py-4 text-white">
                            ${holding.invested}
                          </td>
                          <td className="px-6 py-4 text-white">
                            {new Date(holding.purchaseDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>

                          <td className="px-6 py-4 text-white">
                            {holding.notes}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 ">
              {holdings.map((holding) => {
                return (
                  <div
                    key={holding.symbol}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold">
                          {holding.symbol}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {holding.stockName}
                        </p>
                      </div>
                      <span className="text-white text-sm font-medium">
                        {holding.quantity} shares
                      </span>
                    </div>

                    <div className="text-sm text-gray-300">
                      <p>
                        Avg Price:{" "}
                        <span className="text-white">${holding.invested}</span>
                      </p>
                      <p>
                        Current:{" "}
                        <span className="text-white">${holding.invested}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${holding.allocation}%` }}
                        />
                      </div>
                      <span className="text-white text-sm">
                        {holding.allocation}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
