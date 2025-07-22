import {
  User,
  Phone,
  MapPin,
  IndianRupee,
  TrendingUp,
  CreditCard,
  AtSign,
  Mail,
} from "lucide-react";
import CustomBg from "../assets/custom_bg";
import Sidebar from "../assets/Sidebar";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [location, setLocation]=  useState("");
  const [phone,setPhone] = useState("");
  const [occupation,setOccupation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/auth/getme`, {
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
      } else {
        setError("Something went wrong");
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="bg-black min-h-screen font-sans relative">
      <CustomBg />
      <div className="flex relative z-10">
        <Sidebar />

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
                      <h2 className="text-xl sm:text-2xl font-bold text-white text-center md:text-left">
                        {firstname} {lastname}
                      </h2>

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

                  <div className="w-full md:w-auto mt-4 md:mt-0">
                    <button className="w-full md:w-auto px-4 py-2 bg-white/10 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Edit Profile
                    </button>
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
                <div className="text-2xl font-bold text-white mb-1">₹00000</div>
                <div className="text-sm text-green-400">0% this month</div>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-400" size={24} />
                  </div>
                  <span className="text-sm text-gray-400">
                    Investment Return
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">0%</div>
                <div className="text-sm text-blue-400">Last 12 months</div>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-purple-400" size={24} />
                  </div>
                  <span className="text-sm text-gray-400">Active Cards</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-sm text-purple-400">0 Credit, 0 Debit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
