import { useEffect, useState } from "react";
import { DeleteIcon } from "../../icons/delete";

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

type AccountType = {
  _id: string;
  accountName: string;
};

export default function Expense() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccounts] = useState<AccountType[]>([]);
  const [selectedAccount, setselectedAccountId] = useState("");
  const [showSheet, setShowSheet] = useState(false);

  const [form, setForm] = useState({
    type: "Income",
    amount: "",
    description: "",
    tags: "",
    toWhom: "",
  });

  // Data Fecthing
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const [txRes, accRes] = await Promise.all([
          fetch("http://localhost:3001/api/trans/get-trans", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:3001/api/acc/accounts", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        const txData = await txRes.json();
        const accData = await accRes.json();

        if (txData?.transaction) {
          setTransactions(txData.transaction.slice(0, 30));
        }
        if (accData?.account) {
          const validAccounts = accData.account.filter(
            (acc: AccountType & { balance?: number }) => (acc.balance ?? 0) > 0
          );

          setAccounts(validAccounts);
        }
      } catch (error) {
        console.error(" Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add transaction
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !setselectedAccountId) {
      alert(`Missing token or account selection`);
      return;
    }
    const parsedAmount = parseFloat(form.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert(`Please enter a valid amount`);
      return;
    }

    const payload = {
      accountId: selectedAccount,
      type: form.type,
      amount: parsedAmount,
      description: form.description.trim(),
      tags: form.tags
        .split(",")
        .map((tags) => tags.trim())
        .filter(Boolean),
      toWhom: form.toWhom.trim(),
    };

    try {
      const res = await fetch("http://localhost:3001/api/trans/post-trans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || `Failed to post transaction`);
      }
      setTransactions((prev) => [result.transaction, ...prev.slice(0, 29)]);
      setForm({
        type: "Income",
        amount: "",
        description: "",
        tags: "",
        toWhom: "",
      });
      setselectedAccountId("");
      setShowSheet(false);
      window.location.reload();
    } catch (error) {
      console.error("Error posting transaction:", error);
      alert("Failed to post transaction");
    }
  };

  const handleDelete = async (txId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(`Token missing`);
    }
    const confirmed = window.confirm(
      `Are you sure you want to delete this transaction?`
    );
    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/trans/delete-trans/${txId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if(!res.ok){
        throw new Error(result.message || `Failed to delete transactions`);
      }
      setTransactions((prev) => prev.filter((tx) => tx._id !== txId));
      window.location.reload()
      alert(`Transaction deleted and account balance updated`)
    } catch (error) {
      console.log(`Error deleting transaction`, error)
    }
  };

  return (
    <div className="lg:col-span-5 bg-white/10 rounded-2xl p-4 col-span-1 shadow-sm backdrop-blur-sm h-172 overflow-y-auto">
      {/* Header Row */}
      <div className="flex flex-row justify-between items-center pb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button
          onClick={() => setShowSheet(true)}
          className="border border-white/20 bg-white/10 text-sm text-white rounded px-4 py-1 hover:bg-white/50 transition"
        >
          Add
        </button>
      </div>
      {/* Bottom Sheet */}
      {showSheet && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items- justify-center">
          <div className="bg-[#1c1c1e] w-full max-w-md mx-auto mt-10 rounded-b-2xl p-6 text-white space-y-4 shadow-lg">
            <div className="w-12 h-1.5 bg-white/30 mx-auto rounded-full" />
            <h3 className="text-lg font-semibold text-center">
              Add Transaction
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <select
                value={selectedAccount}
                onChange={(e) => setselectedAccountId(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-white/10 outline-none"
              >
                <option value="">Select Account</option>
                {account.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.accountName}
                  </option>
                ))}
              </select>

              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 rounded bg-white/10 outline-none"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>

              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3 py-2 rounded bg-white/10 placeholder-gray-400 outline-none"
                required
              />
              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-white/10 placeholder-gray-400 outline-none"
              />
              <input
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-3 py-2 rounded bg-white/10 placeholder-gray-400 outline-none"
              />
              <input
                placeholder="To Whom"
                value={form.toWhom}
                onChange={(e) => setForm({ ...form, toWhom: e.target.value })}
                className="w-full px-3 py-2 rounded bg-white/10 placeholder-gray-400 outline-none"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSheet(false)}
                  className="text-sm px-4 py-2 border border-white/30 rounded hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <div className="space-y-1">
                <p className="font-semibold text-white">{tx.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(tx.date).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  {tx.accountId?.accountName}
                  {tx.toWhom && ` • ${tx.toWhom}`}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3 pt-1 min-w-[60px]">
                <span
                  className={`text-sm ${
                    tx.type === "Income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ₹ {tx.amount}
                </span>
                <button
                  onClick={() => handleDelete(tx._id)}
                  title="Delete transaction"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
