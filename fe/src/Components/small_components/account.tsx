export default function Account() {
  return (
    <>
      <div className="bg-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-2">Account Report</h2>
        <div className="text-sm text-gray-300 space-y-1">
          <p>Balance: $5,000</p>
          <p>Income: $2,000</p>
          <p>Expenses: $1,200</p>
        </div>
      </div>
    </>
  );
}
