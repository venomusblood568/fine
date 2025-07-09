

export default function StockInfo() {
 
  return (
    <>
      <div className="bg-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm h-64 overflow-y-auto">
        <div className="flex flex-row justify-between items-center pb-2">
          <h2 className="text-lg font-semibold mb-2 pt-2">Stocks Overview</h2>
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
