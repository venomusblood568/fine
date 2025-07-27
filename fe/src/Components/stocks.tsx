import { useEffect, useState } from "react";
import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/Sidebar";
import {
  TrendingUp,
  IndianRupee,
  Percent,
  Plus,
  Eye,
  EyeOff,
  X,
  Pencil,
  Trash2,
} from "lucide-react";



type Holding = {
  _id: string;
  stockName: string;
  symbol: string;
  quantity: number;
  invested: number;
  purchaseDate: string;
  exchange?: string;
  notes?: string;
};

export default function Stocks() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedStock, setSelectedStock] = useState<null | Holding>(null);
  const [loading, setLoading] = useState(true);

  const [showtotal, setShowtotal] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  const [stockToDelete, setStockToDelete] = useState<string | null>(null);

  const [newStock, setnewStock] = useState({
    stockName: "",
    symbol: "",
    exchange: "",
    quantity: "",
    invested: "",
    purchaseDate: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setnewStock((prev) => ({
      ...prev,
      [name]: value,
    }));
  }; 

  useEffect(() => {
    const fetchHoldings = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://fine-fwhx.onrender.com/api/stock/get_stocks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unauthorized for access");
        }

        const data = await response.json();
        setHoldings(data.stocks || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching holdings: ", error);
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const handleAddStock = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const payload = {
        ...newStock,
        quantity: Number(newStock.quantity),
        invested: Number(newStock.invested),
      };

      const response = await fetch(
        `https://fine-fwhx.onrender.com/api/stock/post_stock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add stock: ${errorText}`);
      }

      const savedStock = await response.json();
      setHoldings((prev) => [...prev, savedStock.stock]);
      console.log("✅ Saved to backend:", savedStock);
      
      // Reset form
      setShowPopup(false);
      setnewStock({
        stockName: "",
        symbol: "",
        exchange: "",
        quantity: "",
        invested: "",
        purchaseDate: "",
        notes: "",
      });
    } catch (error) {
      console.error("❌ Error adding stock:", error);
    }
  };

  const totalInvested = holdings.reduce(
    (total,stock) => total + Number(stock.invested || 0),
    0
  );
  
  useEffect(() => {
    localStorage.setItem("totalInvestment",JSON.stringify(totalInvested));
  },[totalInvested])

  const handleDeleteStock = async(id:string) => {
    try {
      const response = await fetch(
        `https://fine-fwhx.onrender.com/api/stock/delete_stock/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

        if(!response.ok){
          console.log(`Error while deleting`);
          return
        }
        setHoldings((prev) => prev.filter((stock) => stock._id !== id))
    } catch (error) {
      console.log(`Failed to delete Stocks: `,error);
    }
  }

  const handleUpdateStock = async(e? : React.FormEvent) => {
    e?.preventDefault();
    if(!selectedStock) return
    try {
      const payload = {
        ...newStock,
        stockName: String(newStock.stockName),
        symbol: String(newStock.symbol),
        exchange: String(newStock.exchange),
        quantity: Number(newStock.quantity),
        invested: Number(newStock.invested),
        purchaseDate: newStock.purchaseDate
          ? new Date(newStock.purchaseDate)
          : undefined,
        notes: String(newStock.notes),
      };

      const response = await fetch(
        `https://fine-fwhx.onrender.com/api/stock/update_stock/${selectedStock._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if(!response.ok){
        console.log(`response.ok failed`)
      }

      const update = await response.json()
      setHoldings((prev) =>
        prev.map((stock) =>
          stock._id === selectedStock._id ? update.stock : stock
        )
      );
      setShowPopup(false);
      setSelectedStock(null);
      setnewStock({
        stockName: "",
        symbol: "",
        exchange: "",
        quantity: "",
        invested: "",
        purchaseDate: "",
        notes: "",
      });
      console.log("✅ Stock updated:", update);
    } catch (error) {
      console.log(`Error while updating`, error)
    }
  }
  return (
    <div className="bg-black min-h-screen font-mono flex w-full overflow-x-hidden">
      <CustomBg />
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />

        {showPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center">
            <div className="bg-[#393E46] rounded-xl shadow-2xl w-full max-w-lg border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600">
                <h2 className="text-2xl font-semibold text-white">
                  Add Stocks
                </h2>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <form
                onSubmit={selectedStock ? handleUpdateStock : handleAddStock}
                className="px-6 py-4 space-y-4 text-white"
              >
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="stockName"
                    placeholder="Stock Name"
                    value={newStock.stockName}
                    onChange={handleChange}
                    className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                  />
                  <input
                    type="text"
                    name="symbol"
                    placeholder="Symbol"
                    value={newStock.symbol}
                    onChange={handleChange}
                    className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      name="exchange"
                      className="input-style border-b border-gray-300 bg-transparent text-white"
                      value={newStock.exchange}
                      onChange={handleChange}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select Exchange
                      </option>
                      <option value="NSE" className="text-black">
                        NSE
                      </option>
                      <option value="BSE" className="text-black">
                        BSE
                      </option>
                    </select>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      value={newStock.quantity}
                      onChange={handleChange}
                      className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                    />
                    <input
                      type="number"
                      name="invested"
                      placeholder="Invested"
                      value={newStock.invested}
                      onChange={handleChange}
                      className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                    />
                    <input
                      type="date"
                      name="purchaseDate"
                      value={newStock.purchaseDate}
                      onChange={handleChange}
                      className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                    />
                  </div>
                  <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    value={newStock.notes}
                    onChange={handleChange}
                    className="input-style border-b border-gray-300 placeholder-gray-400 text-white"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showConfirm && stockToDelete && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white w-80 space-y-4">
              <h3 className="text-lg font-semibold">Confirm Delete</h3>
              <p>Are you sure you want to delete this stock?</p>
              <div className="flex justify-between gap-4 pt-2 ">
                <button
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => setshowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={async () => {
                    await handleDeleteStock(stockToDelete);
                    setshowConfirm(false);
                    setStockToDelete(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 px-6 py-15 z-10 overflow-y-auto">
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
                onClick={() => setShowPopup(true)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition"
              >
                <Plus />
                Add Stock
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="flex flex-col gap-3">
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-2xl">Total Value</span>
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
                <span className="text-emerald-500">₹</span>
                {showtotal ? `-` : "••••••"}
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-400 text-sm">Total Cost</span>
                  </div>
                  <button
                    onClick={() => setShowCost(!showCost)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {showCost ? (
                      <Eye className="w-5 h-5 text-white" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
                <p className="text-white text-2xl font-bold">
                  {showCost
                    ? `₹ ${totalInvested.toLocaleString("en-IN")}`
                    : "••••••"}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400 text-sm">Total Gain/Loss</span>
                </div>
                <p className="text-white text-2xl font-bold">₹ - </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400 text-sm">Return %</span>
                </div>
                <p className="text-white text-2xl font-bold">- %</p>
              </div>
            </div>
          </div>

          {/* Holdings Table */}
          <div>
            <h2 className="text-white text-2xl font-bold py-5">Holdings</h2>

            {/* Desktop View */}
            <div className="hidden md:block border border-gray-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                {loading ? (
                  <p className="text-white text-center py-6">
                    Loading your stocks...
                  </p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        {[
                          "Action",
                          "Stock Name",
                          "Symbol",
                          "Shares",
                          "Invested",
                          "Last Purchase Date",
                          "Notes",
                        ].map((head) => (
                          <th
                            key={head}
                            className="text-left text-gray-400 text-sm font-medium px-6 py-4"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {holdings.map((holding, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-white">
                            <div className="flex gap-4 items-center">
                              <button
                                onClick={() => {
                                  setSelectedStock(holding);
                                  setnewStock({
                                    stockName: holding.stockName,
                                    symbol: holding.symbol,
                                    exchange: holding.exchange || "",
                                    quantity: String(holding.quantity),
                                    invested: String(holding.invested),
                                    purchaseDate: holding.purchaseDate,
                                    notes: holding.notes || "",
                                  });
                                  setShowPopup(true); 
                                }}
                                className="text-white hover:text-blue-600 cursor-pointer"
                                title="Edit"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                className="text-white hover:text-red-600 cursor-pointer"
                                onClick={() => {
                                  setStockToDelete(holding._id);
                                  setshowConfirm(true);
                                }}
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white">
                            {holding.stockName}
                          </td>
                          <td className="px-6 py-4 text-white">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white">
                                {holding.symbol}
                              </span>
                              <span className="text-xs text-gray-400">
                                {holding.exchange}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white">
                            {holding.quantity}
                          </td>
                          <td className="px-6 py-4 text-white">
                            ₹ {holding.invested}
                          </td>
                          <td className="px-6 py-4 text-white">
                            {new Date(holding.purchaseDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-6 py-4 text-white">
                            {holding.notes || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mt-4">
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2 animate-pulse"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-36"></div>
                        </div>
                        <div className="h-4 bg-gray-700 rounded w-16"></div>
                      </div>
                      <div className="h-3 bg-gray-700 rounded w-32"></div>
                      <div className="h-3 bg-gray-700 rounded w-40"></div>
                      <div className="h-3 bg-gray-700 rounded w-28"></div>
                    </div>
                  ))
                : holdings.map((holding, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-semibold">
                            {holding.symbol}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {holding.stockName} • {holding.exchange || "-"}
                          </p>
                        </div>
                        <span className="text-white text-sm font-medium">
                          {holding.quantity} shares
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Invested:{" "}
                        <span className="text-white">₹{holding.invested}</span>
                      </p>
                      <p className="text-sm text-gray-300">
                        Date:{" "}
                        <span className="text-white">
                          {new Date(holding.purchaseDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Notes: {holding.notes?.trim() ? holding.notes : "-"}
                      </p>
                      <div className="flex justify-end gap-4 pt-2">
                        <button
                          onClick={() => {
                            setSelectedStock(holding);
                            setnewStock({
                              stockName: holding.stockName,
                              symbol: holding.symbol,
                              exchange: holding.exchange || "",
                              quantity: String(holding.quantity),
                              invested: String(holding.invested),
                              purchaseDate: holding.purchaseDate,
                              notes: holding.notes || "",
                            });
                            setShowPopup(true);
                          }}
                          className="text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setStockToDelete(holding._id);
                            setshowConfirm(true);
                          }}
                          className="text-red-700 "
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
