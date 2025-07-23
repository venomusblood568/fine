import { useState } from "react";
import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/Sidebar";
import {
  TrendingUp,
  IndianRupee,
  Percent,
  Crosshair,
  Plus,
  Eye,
  EyeOff,
} from "lucide-react";
import { Holdingtable } from "./small_components/holdingTable";
export default function Stocks() {
  const[showtotal,setShowtotal]= useState(false)
  const[showCost,setShowCost] = useState(false)
  const[showTarget,setShowTarget] = useState(false)
  return (
    <div className="bg-black min-h-screen font-mono flex">
      <CustomBg />
      <div className="flex h-screen">
        <Sidebar />

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
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-green-500 text-green-400 hover:bg-green-600 hover:text-white transition"
              >
                <Crosshair />
                Add Target
              </button>

              <button
                type="button"
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition"
              >
                <Plus />
                Add Stock
              </button>
            </div>
          </div>
          {/* cards */}
          <div className="flex  flex-col gap-3">
            <div className=" border border-gray-800 rounded-xl p-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  {/* Left part: icon + label */}
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-400 text-sm">Total Cost</span>
                  </div>

                  {/* Right part: Eye toggle */}
                  <button
                    onClick={() => setShowCost(!showCost)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    {showCost ? (
                      <Eye className="w-5 h-5 text-white" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Value */}
                <p className="text-white text-2xl font-bold">
                  {showCost ? `3,160` : "••••••"}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400 text-sm">Total Gain/Loss</span>
                </div>
                <p className="text-white text-2xl font-bold">$000</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400 text-sm">Return %</span>
                </div>
                <p className="text-white text-2xl font-bold">231%</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  {/* Left part: icon + label */}
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-400 text-sm">Target Investment</span>
                  </div>

                  {/* Right part: Eye toggle */}
                  <button
                    onClick={() => setShowTarget(!showTarget)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    {showTarget ? (
                      <Eye className="w-5 h-5 text-white" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Value */}
                <p className="text-white text-2xl font-bold">
                  {showTarget ? `10,000` : "••••••"}
                </p>
              </div>
            </div>
          </div>
          {/*Holdin table*/}
          <Holdingtable/>
        </main>
      </div>
    </div>
  );
}
