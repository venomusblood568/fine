/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  User,
  Phone,
  MapPin,
  IndianRupee,
  TrendingUp,
  CreditCard,
  AtSign,
  Mail,
  X,
} from "lucide-react";
import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/Sidebar";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userId, setUserId] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [card, setCard] = useState<number | null>(null);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    occupation: "",
    phone: "",
    location: "",
  });
  const fetchInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`https://fine-fwhx.onrender.com/api/auth/getme`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setFirstname(data.user.firstname);
        setLastname(data.user.lastname);
        setUsername(data.user.username);
        setMail(data.user.mail);
        setLocation(data.user.location);
        setPhone(data.user.phone);
        setOccupation(data.user.occupation);
        setUserId(data.user._id);
        setBalance(data.totalWalletBalance);
        setCard(data.cardCount);
        console.log(data.cardCount)
        
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(`You are unauthorized...`);
    }
    try {
      const res = await fetch(
        `https://fine-fwhx.onrender.com/api/auth/updateme/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Update Success:", data);
        setShowPopup(false);
        fetchInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen font-mono relative">
      <CustomBg />
      <div className="flex relative z-10">
        <Sidebar />
        {showPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center">
            <div className="bg-blue-200 text-black rounded-xl shadow-2xl w-full max-w-lg border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600">
                <div>
                  <h2 className="text-2xl font-semibold">Quick Actions</h2>
                  <p className="text-xs">
                    Only change what you want to change.
                  </p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdate} className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                    className="input-style border-b-1 border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                    className="input-style border-b-1 border-gray-300"
                  />
                  <input
                    type="email"
                    placeholder="Mail ID"
                    value={formData.mail}
                    onChange={(e) =>
                      setFormData({ ...formData, mail: e.target.value })
                    }
                    className="input-style border-b-1 border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="input-style border-b-1 border-gray-300"
                  />
                  <input
                    type="tel"
                    placeholder="Phone No."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="input-style border-b-1 border-gray-300 "
                  />
                  <input
                    type="text"
                    placeholder="Occupation"
                    value={formData.occupation}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                    className="input-style border-b-1 border-gray-300"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Update Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex-1 px-6 py-16 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
              <p className="text-gray-400">
                Manage your account settings and financial preferences
              </p>
            </div>

            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 space-y-4 md:space-y-0">
                  <div className="flex-1 w-full">
                    <div className="mb-4">
                      {/* Name */}
                      <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl sm:text-2xl font-bold text-white text-center md:text-left">
                          {firstname} {lastname}
                        </h2>
                        <div className="w-full md:w-auto mt-4 md:mt-0">
                          <button
                            onClick={() => {
                              setFormData({
                                firstname,
                                lastname,
                                mail,
                                location,
                                phone,
                                occupation,
                              });
                              setShowPopup(true);
                            }}
                            className="w-full md:w-auto px-4 py-2 bg-white/10 hover:bg-blue-700 text-white rounded-lg transition-colors hover:cursor-pointer"
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                      {/* Username below in small text */}
                      <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-400 mt-1">
                        <AtSign size={14} className="text-green-400" />
                        <span className="truncate max-w-[200px]">
                          {username || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Mail size={18} className="text-green-400" />
                        <span>{mail || "N/A"}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Phone size={18} className="text-green-400" />
                        <span>{phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <MapPin size={18} className="text-green-400" />
                        <span>{location || "N/A"}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <User size={18} className="text-green-400" />
                        <span>Occupation : {occupation || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <IndianRupee className="text-green-400" size={24} />
                  </div>
                  <span className="text-sm text-gray-400">Total Balance</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ₹ {balance ?? "Error"}
                </div>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-400" size={24} />
                  </div>
                  <span className="text-sm text-gray-400">
                    Total Investment
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">0%</div>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-purple-400" size={24} />
                  </div>
                  <span className="text-sm text-gray-400">Total Cards</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  <div className="text-2xl font-bold text-white mb-1">
                    {card !== null && card > 0 ? (
                      `${card}`
                    ) : (
                      <span className="text-yellow-400">No cards added.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
