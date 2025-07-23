import { PieChart } from "lucide-react";

export function Holdingtable(){
    const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, avgPrice: 175.32, currentPrice: 182.52, allocation: 35.2 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 15, avgPrice: 2650.84, currentPrice: 2734.84, allocation: 28.1 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 25, avgPrice: 365.18, currentPrice: 378.85, allocation: 20.5 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 30, avgPrice: 255.67, currentPrice: 248.42, allocation: 16.2 },
  ];
    return (
      <div>
        <div>
          <h2 className="text-white text-2xl font-bold py-5">Holdings</h2>

          {/* Desktop Table */}
          <div className="hidden md:block  border border-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
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
                      Market Value
                    </th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                      Gain/Loss
                    </th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                      Allocation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {holdings.map((holding) => {
                    const marketValue = holding.shares * holding.currentPrice;
                    const costBasis = holding.shares * holding.avgPrice;
                    const gainLoss = marketValue - costBasis;
                    const gainLossPercent = (gainLoss / costBasis) * 100;

                    return (
                      <tr
                        key={holding.symbol}
                        className="hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">
                              {holding.symbol}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {holding.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white">
                          {holding.shares}
                        </td>
                        <td className="px-6 py-4 text-white">
                          ${holding.avgPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-white">
                          ${holding.currentPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          ${marketValue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p
                              className={`font-medium ${
                                gainLoss >= 0
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)}
                            </p>
                            <p
                              className={`text-sm ${
                                gainLossPercent >= 0
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {gainLossPercent >= 0 ? "+" : ""}
                              {gainLossPercent.toFixed(2)}%
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
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
              const marketValue = holding.shares * holding.currentPrice;
              const costBasis = holding.shares * holding.avgPrice;
              const gainLoss = marketValue - costBasis;
              const gainLossPercent = (gainLoss / costBasis) * 100;

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
                      <p className="text-gray-400 text-xs">{holding.name}</p>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {holding.shares} shares
                    </span>
                  </div>

                  <div className="text-sm text-gray-300">
                    <p>
                      Avg Price:{" "}
                      <span className="text-white">
                        ${holding.avgPrice.toFixed(2)}
                      </span>
                    </p>
                    <p>
                      Current:{" "}
                      <span className="text-white">
                        ${holding.currentPrice.toFixed(2)}
                      </span>
                    </p>
                    <p>
                      Market Value:{" "}
                      <span className="text-white">
                        ${marketValue.toFixed(2)}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        gainLoss >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)} (
                      {gainLossPercent >= 0 ? "+" : ""}
                      {gainLossPercent.toFixed(2)}%)
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
        <div className="px-4 sm:px-0">
          <h2 className="text-white text-2xl font-bold py-5">
            Allocation Breakdown
          </h2>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pie chart on top for mobile */}
              <div className="order-1 md:order-none flex items-center justify-center">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 via-blue-500 to-red-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">
                          Portfolio
                        </p>
                        <p className="text-gray-400 text-xs">Distribution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Holdings list */}
              <div className="space-y-4">
                {holdings.map((holding, index) => (
                  <div key={holding.symbol} className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: [
                          "#10b981",
                          "#3b82f6",
                          "#f59e0b",
                          "#ef4444",
                        ][index % 4],
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">
                          {holding.symbol}
                        </span>
                        <span className="text-gray-400">
                          {holding.allocation}%
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        ₹{(holding.shares * holding.currentPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}