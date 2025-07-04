

export default function Expense() {
  return (
    <div className="lg:col-span-5 bg-white/10 rounded-2xl p-4 col-span-1 shadow-sm backdrop-blur-sm  overflow-y-auto">
      {/* Header Row */}
      <div className="flex flex-row justify-between items-center pb-4">
        <h2 className="text-lg font-semibold">Today's Transactions</h2>
        <button className="border border-white/20 bg-white/10 text-sm text-white rounded px-4 py-1 hover:bg-white/50 transition">
          Add
        </button>
      </div>

      {/* Divider */}
      <hr className="border-white/10 mb-2" />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-300 space-y-2">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between  border-white/10 pb-1"
          >
            <span>Expense {i + 1}</span>
            <span>$25</span>
          </div>
        ))}
      </div>
    </div>
  );
}
