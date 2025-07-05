import { useEffect, useState } from "react";

type AccountType = {
  _id: string;
  userId: string;
  accountName: string;
  accountType: string;
  balance: number;
};

export default function Account() {
  const [account, setAccount] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAccount = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }
      try {
        const res = await fetch("http://localhost:3001/api/acc/accounts", {
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
        setAccount(data.account || []);
      } catch (error) {
        console.error(`Error fetching transactions: `, error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);
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
          {loading ? (
            <p>Loading...</p>
          ) : account.length === 0 ? (
            <p>No Account found.</p>
          ) : (
            account.map((tx) => (
              <div
                key={tx._id}
                className="flex justify-between border-white/10 pb-2 border-b uppercase"
              >
                <div>
                  <p className="font-medium">{tx.accountName}</p>
                  <p className="text-xs text-gray-500">{tx.accountType}</p>
                </div>
                <span>₹ {tx.balance}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
