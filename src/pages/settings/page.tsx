import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaTrash,
  FaSave,
  FaTimes,
  FaMoon,
  FaSun,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import SideBar from "../../components/layout/SideBarLayout";

export default function Settings() {
  const [settings, setSettings] = useState({
    profileVisibility: "public",
    emailNotifications: true,
    darkMode: false,
    password: "",
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);
//   const [message, setMessage] = useState("");
  const [connectedAccounts] = useState({
    google: true,
    facebook: false,
    twitter: false,
  });

// @ts-expect-error jk mk
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };
// @ts-expect-error jk mk
  const handleToggle = (key) => {
// @ts-expect-error jk mk
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    // setMessage("Settings updated successfully!");
    // setTimeout(() => setMessage(""), 2000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      alert("Your account has been deleted.");
    }
  };

  return (
    <motion.div className="flex min-h-screen overflow-x-hidden pt-20 bg-black text-white">
      <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
        <SideBar />
      </motion.div>

      <motion.div
        className="flex items-center justify-center min-h-screen bg-black text-white p-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center neon-glow">Settings ⚙️</h2>
          <p className="text-gray-400 text-center mt-2">Manage your account settings and preferences.</p>

          <div className="mt-6 space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <label className="block text-gray-400 mb-2">Profile Visibility</label>
              <select
                name="profileVisibility"
                value={settings.profileVisibility}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400 border border-gray-600"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle("emailNotifications")}
                  className="w-5 h-5 accent-red-500"
                />
                <span className="text-gray-400">Enable Email Notifications</span>
              </label>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle("darkMode")}
                  className="w-5 h-5 accent-red-500"
                />
                <span className="text-gray-400 flex items-center">
                  {settings.darkMode ? <FaMoon className="mr-2" /> : <FaSun className="mr-2" />}
                  Enable Dark Mode
                </span>
              </label>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
              <div className="flex justify-between items-center">
                <label className="block text-gray-400">Change Password</label>
                {!isEditingPassword ? (
                  <button onClick={() => setIsEditingPassword(true)} className="text-gray-300 hover:text-white transition-all">
                    <FaLock className="text-xl" /> Edit
                  </button>
                ) : (
                  <button onClick={() => setIsEditingPassword(false)} className="text-gray-300 hover:text-white transition-all">
                    <FaTimes className="text-xl" /> Cancel
                  </button>
                )}
              </div>
              {isEditingPassword && (
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={settings.password}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400 border border-gray-600"
                />
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }}>
              <h3 className="text-gray-400 mb-2">Connected Accounts</h3>
              <div className="flex space-x-4">
                <FaGoogle className={`text-2xl ${connectedAccounts.google ? "text-green-500" : "text-gray-500"} cursor-pointer`} />
                <FaFacebookF className={`text-2xl ${connectedAccounts.facebook ? "text-blue-500" : "text-gray-500"} cursor-pointer`} />
                <FaTwitter className={`text-2xl ${connectedAccounts.twitter ? "text-blue-400" : "text-gray-500"} cursor-pointer`} />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={handleSave}
              className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white text-lg transition-all flex items-center justify-center"
            >
              <FaSave className="mr-2" /> Save Changes
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              onClick={handleDeleteAccount}
              className="w-full bg-gray-700 hover:bg-gray-800 p-3 rounded-lg text-white text-lg transition-all flex items-center justify-center"
            >
              <FaTrash className="mr-2" /> Delete Account
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
