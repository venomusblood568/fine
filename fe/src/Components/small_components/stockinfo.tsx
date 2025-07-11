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
        const res = await fetch(
          "https://fine-fwhx.onrender.com/api/stock/get_stocks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

      <div className="text-sm text-gray-300 space-y-2 font-mono">
        {loading ? (
          <p>Loading stocks...</p>
        ) : stocks.length === 0 ? (
          <p>No stocks found.</p>
        ) : (
          stocks.map((stock) => (
            <div
              key={stock._id}
              className="flex justify-between items-center border-b border-white/10 pb-2"
            >
              {/* Stock Name (can wrap) */}
              <p className="text-white font-medium break-words max-w-[70%]">
                {stock.stockName}
              </p>

              {/* Quantity aligned right */}
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {stock.quantity} Shares
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
