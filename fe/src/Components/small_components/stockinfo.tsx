export default function StockInfo(){
    return (
      <>
        <div className="bg-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-2">Stocks Overview</h2>
          <div className="text-sm text-gray-300 space-y-1">
            <p>📈 Apple - $145 (+2.3%)</p>
            <p>📉 Tesla - $680 (-1.1%)</p>
            <p>📈 Amazon - $3,200 (+0.5%)</p>
          </div>
        </div>
      </>
    );
}