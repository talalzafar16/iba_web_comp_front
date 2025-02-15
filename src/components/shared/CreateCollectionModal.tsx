import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// @ts-expect-error kj kj
export default function CreateCollectionModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverVideo: null,
    isPublic: false,
    isPaid: "free", // 'free' or 'paid'
    price: "",
  });

// @ts-expect-error kj kj
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// @ts-expect-error kj kj
  const handleFileChange = (e) => {
    setFormData({ ...formData, coverVideo: e.target.files[0] });
  };

  const handleTogglePrivacy = () => {
    setFormData({ ...formData, isPublic: !formData.isPublic });
  };

// @ts-expect-error kj kj
  const handleIsPaidChange = (e) => {
    setFormData({ ...formData, isPaid: e.target.value });
  };
// @ts-expect-error kj kj

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "" || !formData.coverVideo) return;
    if (formData.isPaid === "paid" && !formData.price) return;
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div className="fixed z-[9999999] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/90 backdrop-blur-lg p-6 rounded-lg shadow-lg max-w-md w-full relative"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4 text-center">Create New Collection</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Collection Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 rounded-lg text-white"
          />

          <textarea
            name="description"
            placeholder="Collection Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 rounded-lg text-white"
          />

          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
          />

          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <span className="text-white">Collection Privacy:</span>
            <button
              type="button"
              onClick={handleTogglePrivacy}
              className={`px-4 py-2 rounded-lg transition ${
                formData.isPublic ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
              } text-white`}
            >
              {formData.isPublic ? "Public" : "Private"}
            </button>
          </div>

          {formData.isPublic && (
            <div className="bg-gray-800 p-3 rounded-lg">
              <label className="text-white">Collection Access:</label>
              <select
                name="isPaid"
                value={formData.isPaid}
                onChange={handleIsPaidChange}
                className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          )}

          {formData.isPublic && formData.isPaid === "paid" && (
            <input
              type="number"
              name="price"
              placeholder="Enter Price ($)"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 rounded-lg text-white"
            />
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white transition-all">
            Create Collection
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
