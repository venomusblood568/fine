import { useEffect, useState } from "react";
import { DeleteIcon } from "../../icons/delete";
import { EditIcon } from "../../icons/edit";


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
  const [showSheet, setShowSheet] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // New form State
  const [form, setForm] = useState({
    accountName: "",
    accountType: "",
    balance: "",
  });

  // Fetch account
  useEffect(() => {
    const fetchAccount = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }
      try {
        const res = await fetch(
          "https://fine-fwhx.onrender.com/api/acc/accounts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  // Handle Create Account
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert(`No token found`);
      return;
    }
    const payload = {
      accountName: form.accountName.trim(),
      accountType: form.accountType.trim().toLowerCase(),
      balance: parseFloat(form.balance),
    };
    if (!form.accountName.trim() || !form.accountType.trim()) {
      alert("Account name and type are required");
      return;
    }
    try {
      const res = await fetch(
        "https://fine-fwhx.onrender.com/api/acc/create-account",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || `Account creation failed`);
      }
      setAccount((prev) => [result.account, ...prev]);
      setShowSheet(false);
      window.location.reload();
      setForm({ accountName: "", accountType: "", balance: "" });
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Account creation failed");
    }
  };

  // Handle Update Account
  const handleDelete = async (axId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(`Token missing`);
    }
    const confirmed = window.confirm(
      `Are you sure you want to delete this account? `
    );
    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(
        `https://fine-fwhx.onrender.com/api/acc/delete-account/${axId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || `Failed to delete account;`);
      }
      setAccount((prev) => prev.filter((tx) => tx._id !== axId));
      window.location.reload();
    } catch (error) {
      console.log(`Error deleteing Account`, error);
    }
  };

  // Handle update Account
  const handleUpdateAccoutn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    const token = localStorage.getItem("token");
    if (!token) {
      console.error(`No token found`);
      return;
    }
    const payload = {
      accountName: form.accountName.trim(),
      accountType: form.accountType.trim().toLowerCase(),
      balance: parseFloat(form.balance),
    };
    try {
      const res = await fetch(
        `https://fine-fwhx.onrender.com/api/acc/update-account/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Update Failed");
      }
      setEditId(null);
      setShowSheet(false);
      setForm({
        accountName: "",
        accountType: "",
        balance: "",
      });
      window.location.reload();
    } catch (error) {
      console.error(`Update error`, error);
    }
  };

  return (
    <>
      <div className="bg-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm overflow-y-auto h-64">
        {" "}
        {/* Set height here */}
        <div className="flex flex-row justify-between items-center pb-2">
          <h2 className="text-lg font-semibold mb-2 pt-2">Account Report</h2>
          <button
            onClick={() => setShowSheet(true)}
            className="border border-white/20 bg-white/10 text-sm text-white rounded px-4 py-1 hover:bg-white/50 transition"
          >
            Add
          </button>
          {/* Bottom Sheet */}
          {showSheet && (
            <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
              <div className="bg-[#1c1c1e] w-full max-w-sm mx-auto rounded-xl p-4 text-white space-y-3 text-sm shadow-md">
                {/* Drag indicator */}
                <div className="w-10 h-1.5 bg-white/30 mx-auto rounded-full" />

                <h3 className="text-base font-semibold text-center">
                  Add Account
                </h3>

                <form
                  onSubmit={editId ? handleUpdateAccoutn : handleCreateAccount}
                  className="space-y-3"
                >
                  <input
                    placeholder="Account Name"
                    value={form.accountName}
                    onChange={(e) =>
                      setForm({ ...form, accountName: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded bg-white/10 placeholder-gray-400 outline-none text-sm"
                    required
                  />
                  <select
                    required
                    value={form.accountType}
                    onChange={(e) =>
                      setForm({ ...form, accountType: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded bg-white/10 outline-none"
                  >
                    <option value="">Select account type</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank Account</option>
                    <option value="wallet">Wallet</option>
                    <option value="credit card">Credit Card</option>
                    <option value="investment">Investment</option>
                    <option value="savings">Savings</option>
                  </select>
                  <input
                    placeholder="Balance"
                    type="number"
                    value={form.balance}
                    onChange={(e) =>
                      setForm({ ...form, balance: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded bg-white/10 placeholder-gray-400 outline-none text-sm"
                    required
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowSheet(false);
                        setEditId(null);
                        setForm({
                          accountName: "",
                          accountType: "",
                          balance: "",
                        });
                      }}
                      className="text-sm px-3 py-1.5 border border-white/30 rounded hover:bg-white/10"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-sm px-3 py-1.5 bg-white text-black rounded hover:bg-gray-300"
                    >
                      {editId ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
                className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"
              >
                {/* Action buttons */}
                <div className="flex flex-col items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setEditId(tx._id);
                      setForm({
                        accountName: tx.accountName,
                        accountType: tx.accountType,
                        balance: tx.balance.toString(),
                      });
                      setShowSheet(true);
                    }}
                    className="text-gray-400 hover:text-yellow-400 transition"
                    title="Edit account"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    title="Delete account"
                  >
                    <DeleteIcon />
                  </button>
                </div>

                {/* Account name + type */}
                <div className="flex flex-col flex-grow text-left gap-0.5">
                  <p className="font-semibold text-white">{tx.accountName}</p>
                  <p className="text-xs text-gray-500">{tx.accountType}</p>
                </div>

                {/* Balance */}
                <div className="text-right">
                  <span className="font-semibold text-white whitespace-nowrap">
                    ₹ {tx.balance}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
