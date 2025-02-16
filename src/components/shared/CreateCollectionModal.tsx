import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// @ts-expect-error kj kj
export default function CreateCollectionModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverVideo: null,
  });

// @ts-expect-error kj kj
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// @ts-expect-error kj kj
  const handleFileChange = (e) => {
    setFormData({ ...formData, coverVideo: e.target.files[0] });
  };

 
// @ts-expect-error kj kj

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "" || !formData.coverVideo) return;
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

   

         

          {/* Submit Button */}
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white transition-all">
            Create Collection
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
