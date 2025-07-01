import { useEffect, useState } from "react";
import Dock from "../assets/dock";
import {
  VscHome,
  VscAccount,
  VscSettingsGear,
  VscExport,
  VscSymbolMethod,
  VscCircleLarge,
} from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { Popup } from "../Components/popup";

type UserType = {
  firstname: string;
  lastname: string;
  username: string;
};

export default function CustomDock() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileClick = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (isPopupOpen) {
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("http://localhost:3001/api/auth/getme", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.status === 403) {
            localStorage.removeItem("token");
            navigate("/");
            return;
          }

          const data = await response.json();

          if (response.ok) {
            setUserData(data.user); // Correct key
          } else {
            console.error("Fetch failed:", data.message);
            setUserData(null);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setUserData(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    }
  }, [isPopupOpen]);

  const items = [
    {
      icon: <VscHome size={18} className="text-white" />,
      label: "Home",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: <VscCircleLarge size={18} className="text-white" />,
      label: "Money",
      onClick: () => navigate("/money"),
    },
    {
      icon: <VscSymbolMethod size={18} className="text-white" />,
      label: "Stocks",
      onClick: () => navigate("/stocks"),
    },
    {
      icon: <VscAccount size={18} className="text-white" />,
      label: "Profile",
      onClick: handleProfileClick,
    },
    {
      icon: <VscSettingsGear size={18} className="text-white" />,
      label: "Settings",
      onClick: () => alert("Settings!"),
    },
    {
      icon: <VscExport size={18} className="text-white" />,
      label: "Logout",
      onClick: () => navigate("/"),
    },
  ];

  return (
    <div
      className=""
      style={{ fontFamily: "'Space Mono', monospace" }}
    >

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

      {/* Profile Popup */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            User Profile
          </h2>

          {isLoading ? (
            <p className="text-sm text-center text-gray-400">Loading...</p>
          ) : userData ? (
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">First Name:</span>{" "}
                {userData.firstname}
              </p>
              <p>
                <span className="font-medium">Last Name:</span>{" "}
                {userData.lastname}
              </p>
              <p>
                <span className="font-medium">Username:</span>{" "}
                {userData.username}
              </p>
            </div>
          ) : (
            <p className="text-sm text-center text-red-500">User not found.</p>
          )}
        </div>
      </Popup>
    </div>
  );
}
