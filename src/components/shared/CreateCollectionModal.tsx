import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaPlus, FaTag, FaLock, FaGlobe } from "react-icons/fa";
// @ts-expect-error jh jh
export default function CreateCollectionModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverVideo: null,
    tags: [],
    newTag: "",
    isPrivate: false,
  });

        // @ts-expect-error jk k
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

        // @ts-expect-error jk k
  const handleFileChange = (e) => {
    setFormData({ ...formData, coverVideo: e.target.files[0] });
  };

  // Handle Tags
  const handleAddTag = () => {
    if (formData.newTag.trim() !== "") {
      setFormData({
        ...formData,
        // @ts-expect-error jk k
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: "",
      });
    }
  };

        // @ts-expect-error jk k
  const handleRemoveTag = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: updatedTags });
  };

        // @ts-expect-error jk k
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

          <div className="bg-gray-800 p-3 rounded-lg">
            <h3 className="text-white mb-2 flex items-center">
              <FaTag className="mr-2" /> Tags
            </h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Add a tag..."
                value={formData.newTag}
                onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
              />
              <button type="button" onClick={handleAddTag} className="ml-2 bg-red-500 p-2 rounded-lg text-white">
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm flex items-center m-1">
                  {tag} <FaTimes onClick={() => handleRemoveTag(index)} className="ml-2 cursor-pointer text-red-400" />
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <h3 className="text-white flex items-center">
              {formData.isPrivate ? <FaLock className="mr-2" /> : <FaGlobe className="mr-2" />}
              {formData.isPrivate ? "Private Collection" : "Public Collection"}
            </h3>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isPrivate: !formData.isPrivate })}
              className={`px-4 py-2 rounded-lg ${formData.isPrivate ? "bg-red-500" : "bg-green-500"} text-white`}
            >
              {formData.isPrivate ? "Make Public" : "Make Private"}
            </button>
          </div>

          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white transition-all">
            Create Collection
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
