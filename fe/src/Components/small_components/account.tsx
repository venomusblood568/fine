export default function Account() {
  return (
    <>
      <div className="bg-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm overflow-y-auto h-64">
        {" "}
        {/* Set height here */}
        <div className="flex flex-row justify-between items-center pb-2">
          <h2 className="text-lg font-semibold mb-2 pt-2">Account Report</h2>
          <button className="border border-white/20 bg-white/10 text-sm text-white rounded px-4 py-1 hover:bg-white/50 transition">
            Add
          </button>
        </div>
        {/* Divider */}
        <hr className="border-white/10 mb-2" />
        <div className="text-sm text-gray-300 space-y-1">
          {Array.from({ length: 30 }).map((_, idx) => (
            <p key={idx}>
              Balance #{idx + 1}: ${5000 - idx * 10}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
