

export default function Expense() {
  return (
    <div className="lg:col-span-5 bg-white/10 rounded-2xl p-4 col-span-1 shadow-sm backdrop-blur-sm  overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Today's Transactions</h2>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-300 space-y-2">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-white/10 pb-1"
          >
            <span>Expense {i + 1}</span>
            <span>$25</span>
          </div>
        ))}
      </div>
    </div>
  );
}
