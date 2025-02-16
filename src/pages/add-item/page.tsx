import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import SERVER_URL from "../../confidential/index";


import SideBar from "../../components/layout/SideBarLayout";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddItem() {
//   const navigate = useNavigate();
const token = localStorage.getItem("x-token"); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null,
    collection: "",
    isPublic: false,
    isPaid: "basic", // 'free' or 'paid'
    price: "",
  });
  const [collections, setCollections] = useState([]);

  const [preview, setPreview] = useState(null);

  // const collections = ["Cinematic LUTs", "4K Stock Footage", "After Effects Templates", "Color Grading Assets"];

    // @ts-expect-error jk kj
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // @ts-expect-error jk kj
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, media: file });
    // @ts-expect-error jk kj
    setPreview(URL.createObjectURL(file));
  };

    // @ts-expect-error jk kj
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.media || !formData.collection) {
      alert("Please fill in all required fields.");
      return;
    }
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("parent_collection", formData.collection);
    data.append("plan", formData.isPaid);
    data.append("price", formData.price);

    if (formData.media) {
      data.append("video", formData.media);
    }
    data.append("tags", JSON.stringify(["aAI","Love","Nature"]));

    await axios.post(`${SERVER_URL}/items`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
   
    // setLoading(false);
    // setReftech(!refetch)
    toast.success("Successfully Created");
    setTimeout(() => {
      alert("Item added successfully!");
    //   navigate("/dashboard/my-collections");
    }, 1000);
  };

  const handleTogglePrivacy = () => {
    setFormData({ ...formData, isPublic: !formData.isPublic });
  };

// @ts-expect-error kj kj
  const handleIsPaidChange = (e) => {
    setFormData({ ...formData, isPaid: e.target.value });
  };
 
   
   useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/collections/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params:{page_no:1}
        });
        console.log(response)
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
     fetchCollection(); 
   }, [token]);
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
          className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-2xl w-full"
        >
          <h2 className="text-3xl font-bold text-center neon-glow">Add New Item 🎬</h2>
          <p className="text-gray-400 text-center mt-2">Upload media and fill details to add a new item.</p>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <label className="block text-gray-400 mb-2">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter item title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400"
                required
              />
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Enter item description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400"
                required
              ></textarea>
            </motion.div>

            {/* Collection Selection */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
              <label className="block text-gray-400 mb-2">Select Collection</label>
              <select
                name="collection"
                value={formData.collection}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400"
                required
              >
                <option value="">-- Choose a Collection --</option>
                {collections.map((collection, index) => (
                  // @ts-expect-error hjg jk
                  <option key={index} value={collection._id}>
                     {/* @ts-expect-error hjg jk */}
                    {collection.title}
                  </option>
                ))}
              </select>
            </motion.div>
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
                <option value="basic">Free</option>
                <option value="premium">Paid</option>
              </select>
            </div>
          )}

          {formData.isPublic && formData.isPaid === "premium" && (
            <input
              type="number"
              name="price"
              placeholder="Enter Price ($)"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-lg text-white"
            />
          )}

            {/* Upload Media */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="text-center">
              <label className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-all w-full">
                <FaCloudUploadAlt className="mr-2" /> Upload Media
                <input type="file" accept="video/*,image/*" onChange={handleMediaUpload} className="hidden" required />
              </label>

              {/* Preview */}
              {preview && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 rounded-lg overflow-hidden border border-gray-700"
                >
    {/* @ts-expect-error jk kj */}
    {formData.media?.type?.startsWith("video/") ? (
                    <video className="w-full h-40 object-cover rounded-lg" controls>
                      <source src={preview} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white text-lg transition-all"
            >
              Add Item
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
