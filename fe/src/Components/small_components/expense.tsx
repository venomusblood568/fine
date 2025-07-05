import { useEffect,useState } from "react";

type TransactionType = {
  _id: string;
  accountId: {
    _id: string;
    accountName: string;
  };
  type: string;
  amount: number;
  description: string;
  toWhom: string;
  date: string;
};

export default function Expense() {
  const[transactions, setTransactions] = useState<TransactionType[]>([]);
  const[loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTransaction = async () =>{
      const token = localStorage.getItem("token");
      if(!token){
        console.warn(`No token found`)
        return
      }
      try {
        const res = await fetch("http://localhost:3001/api/trans/get-trans", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Fetch failed: ${res.status}`);
        }

        const data = await res.json();
        setTransactions((data.transaction || []).slice(0, 30));
      } catch (error) {
        console.error(`Error fetching transactions:`, error);
      }finally{
        setLoading(false);
      }
    }
    fetchTransaction()
  },[])
  return (
    <div className="lg:col-span-5 bg-white/10 rounded-2xl p-4 col-span-1 shadow-sm backdrop-blur-sm  overflow-y-auto">
      {/* Header Row */}
      <div className="flex flex-row justify-between items-center pb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button className="border border-white/20 bg-white/10 text-sm text-white rounded px-4 py-1 hover:bg-white/50 transition">
          Add
        </button>
      </div>

      {/* Divider */}
      <hr className="border-white/10 mb-2" />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-300 space-y-2">
        {loading ? (
          <p>Loading...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx._id}
              className="flex justify-between border-white/10 pb-2 border-b uppercase"
            >
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-xs text-gray-600">
                  {tx.accountId.accountName} • {tx.toWhom}
                </p>
                <p className="text-xs text-gray-600"></p>
              </div>
              <span
                className={
                  tx.type === "Income" ? "text-green-600" : "text-red-600"
                }
              >
                ${tx.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
