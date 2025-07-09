import { useEffect, useState } from "react";

type StockType = {
  _id: string;
  stockName: string;
  symbol: string;
  exchange: string;
  quantity: number;
  invested: number;
  purchaseDate: string;
  notes?: string;
};

export default function StockInfo() {
  const [stocks, setStocks] = useState<StockType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/stock/get_stocks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.stocks) {
          setStocks(data.stocks);
        } else {
          console.error("Error fetching stocks:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="bg-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm h-64 overflow-y-auto">
      <div className="flex flex-row justify-between items-center pb-2">
        <h2 className="text-lg font-semibold mb-2 pt-2">Your Owned Stocks</h2>
      </div>

      {/* Divider */}
      <hr className="border-white/10 mb-2" />

      <div className="text-sm text-gray-300 space-y-2">
        {loading ? (
          <p>Loading stocks...</p>
        ) : stocks.length === 0 ? (
          <p>No stocks found.</p>
        ) : (
          stocks.map((stock) => (
            <div
              key={stock._id}
              className="flex flex-grow border-b border-white/10 pb-2"
            >
              <div className="flex justify-between items-start text-xs">
                {/* Left: Stock Name - allow wrapping */}
                <p className="text-white font-medium break-words max-w-[60%]">
                  {stock.stockName}
                </p>

                {/* Right: Quantity & Date - single line, no wrap */}
                <div className="text-right whitespace-nowrap text-gray-400 space-x-3">
                  <span>{stock.quantity} Shares</span>
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
