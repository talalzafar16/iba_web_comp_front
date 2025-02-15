import { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaSave, FaLock, FaEdit, FaTimes } from "react-icons/fa";
import SideBar from "../../components/layout/SideBarLayout";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com", 
    country: "United States",
    age: 28,
    profilePic: "/pic2.jpg",
  });

  const [preview, setPreview] = useState(formData.profilePic);
  const [isEditing, setIsEditing] = useState(false); 
// @ts-expect-error k jk
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// @ts-expect-error k jk
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, profilePic: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <motion.div className="flex min-h-screen overflow-x-hidden pt-20 bg-black text-white">
      <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
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
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold neon-glow">Profile 👤</h2>
            {!isEditing && (
              <button
                className="text-gray-300 hover:text-white transition-all"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit className="text-xl" /> Edit
              </button>
            )}
          </div>
          <p className="text-gray-400 mt-2">Update your profile details and avatar.</p>

          <div className="mt-6 space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-red-500 shadow-lg">
                <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
              </div>
              {isEditing && (
                <label className="mt-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-all w-full">
                  <FaCloudUploadAlt className="mr-2" /> Change Profile Picture
                  <input type="file" accept="image/*" onChange={handleProfilePicUpload} className="hidden" />
                </label>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <label className="block text-gray-400 mb-2">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400 border border-gray-600"
                  required
                />
              ) : (
                <p className="text-gray-300 p-3 bg-gray-800 rounded-lg">{formData.name}</p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <label className="block text-gray-400 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full p-3 bg-gray-700 text-gray-400 rounded-lg border border-gray-600 cursor-not-allowed"
                />
                <FaLock className="absolute right-3 top-3 text-gray-400" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
              <label className="block text-gray-400 mb-2">Country</label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400 border border-gray-600"
                  required
                />
              ) : (
                <p className="text-gray-300 p-3 bg-gray-800 rounded-lg">{formData.country}</p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
              <label className="block text-gray-400 mb-2">Age</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400 border border-gray-600"
                  required
                />
              ) : (
                <p className="text-gray-300 p-3 bg-gray-800 rounded-lg">{formData.age}</p>
              )}
            </motion.div>

            {isEditing && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSave}
                  className="w-1/2 bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white text-lg transition-all flex items-center justify-center mr-2"
                >
                  <FaSave className="mr-2" /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 bg-gray-600 hover:bg-gray-700 p-3 rounded-lg text-white text-lg transition-all flex items-center justify-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
