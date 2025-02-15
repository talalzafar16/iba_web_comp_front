import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPlus, FaLock, FaGlobe, FaDollarSign } from "react-icons/fa";
import SideBar from "../../components/layout/SideBarLayout";
import CreateCollectionModal from "../../components/shared/CreateCollectionModal";
import { Link } from "react-router-dom";
import SERVER_URL from "../../confidential/index";
import axios from "axios";
import toast from "react-hot-toast";

export default function MyCollections() {
  const token = localStorage.getItem("x-token"); // Fetch from localStorage/sessionStorage

  const [collections, setCollections] = useState([
    { id: 1, title: "Cinematic LUT Pack", video: "/about-bg-1.mp4", isPublic: true, isPaid: "free", price: "" },
    { id: 2, title: "4K Stock Footage - City Night", video: "/about-bg-2.mp4", isPublic: false, isPaid: "free", price: "" },
    { id: 3, title: "Premium After Effects Template", video: "/about-bg-1.mp4", isPublic: true, isPaid: "paid", price: "25" },
    { id: 4, title: "Aesthetic Color Grading", video: "/about-bg-2.mp4", isPublic: true, isPaid: "free", price: "" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateCollection = async (newCollection) => {
    setLoading(true); // ✅ Show loader when API starts
    try {
      const data = new FormData();
      data.append("title", newCollection.name);
      data.append("description", newCollection.description);
      data.append("isPublic", newCollection.isPrivate);

      if (newCollection.coverVideo) {
        data.append("video", newCollection.coverVideo);
      }

      data.append("tags", JSON.stringify(newCollection.tags));

      const res = await axios.post(`${SERVER_URL}/collections`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
     
      setLoading(false);
      toast.success("Successfully Created");
    } catch (err) {
      toast.error("Error creating collection");
    } finally {
      setLoading(false); // ✅ Hide loader when API completes
    }
  };
  useEffect(()=>{
    const fetch=async()=>{
      const res = await axios.get(`${SERVER_URL}/collections/my?page_no=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     console.log(res,"res")
     setCollections(res.data)
    }
    fetch()
  },[])

  return (
    <motion.div className="flex min-h-screen overflow-x-hidden pt-20 bg-black text-white">
      <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
        <SideBar />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="min-h-screen bg-black text-white p-8 flex-1"
      >
        <h1 className="text-4xl font-bold text-center neon-glow">My Collections 🎬</h1>
        <p className="text-gray-400 text-center mt-2">Manage your cinematic assets.</p>

        <div className="flex justify-between mt-6">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white flex items-center space-x-2 transition-all"
          >
            <FaPlus /> <span>Create Collection</span>
          </motion.button>
        </div>

        {/* ✅ Loader UI */}
        {loading && (
          <div className="flex justify-center items-center mt-6">
            <div className="loader border-4 border-red-500 border-t-transparent w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
          >
            {collections.length > 0 ? (
              collections.map((collection) => (
                <motion.div
                  key={collection.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900/80 group backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700 relative group overflow-hidden"
                >
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform"
                    >
                      <source src={collection.videoUrl} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute hidden w-0 h-0 inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full group-hover:flex duration-700 items-center justify-center transition-all"
                    >
                      <Link to={`/dashboard/collection/${collection.id}`} className="text-white text-lg cursor-pointer font-semibold">
                        View Collection
                      </Link>
                    </motion.div>
                  </div>

                  <h3 className="text-lg font-semibold mt-3 text-center">{collection.title}</h3>
                 {/* @ts-expect-error jk jk */}
                  <h3 className="text-sm  mt-3 text-center">{collection.description}</h3>

                  <div className="flex justify-between items-center mt-2 px-2">
                    <div className="flex items-center space-x-2 text-gray-400">
                      {collection.isPublic ? <FaGlobe className="text-green-400" /> : <FaLock className="text-red-400" />}
                      <span>{collection.isPublic ? "Public" : "Private"}</span>
                    </div>
                    {collection.isPublic && (
                      <div className="flex items-center space-x-2 text-gray-400">
                        {collection.isPaid === "paid" ? (
                          <>
                            <FaDollarSign className="text-yellow-400" />
                            <span>${collection.price}</span>
                          </>
                        ) : (
                          <span className="text-green-400">Free</span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full mt-6">No collections found.</p>
            )}
          </motion.div>
        )}

        <CreateCollectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateCollection} />
      </motion.div>
    </motion.div>
  );
}
