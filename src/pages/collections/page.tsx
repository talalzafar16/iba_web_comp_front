import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PublicCollections() {
  const navigate = useNavigate();

  const [collections] = useState([
    {
      id: 1,
      title: "Cinematic LUT Pack",
      creator: "John Doe",
      creatorProfile: "/profile1.jpg",
      description: "A collection of high-quality LUTs for cinematic grading.",
      video: "/about-bg-1.mp4",
      likes: 230,
    },
    {
      id: 2,
      title: "4K Stock Footage - City Night",
      creator: "Jane Smith",
      creatorProfile: "/profile2.jpg",
      description: "Stunning 4K city night stock footage.",
      video: "/about-bg-2.mp4",
      likes: 125,
    },
    {
      id: 3,
      title: "Premium After Effects Template",
      creator: "Mark Wilson",
      creatorProfile: "/profile3.jpg",
      description: "High-quality After Effects templates for your projects.",
      video: "/about-bg-1.mp4",
      likes: 310,
    },
    {
      id: 4,
      title: "Aesthetic Color Grading",
      creator: "Emily Johnson",
      creatorProfile: "/profile4.jpg",
      description: "Enhance your visuals with professional color grading.",
      video: "/about-bg-2.mp4",
      likes: 180,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
// @ts-expect-error jk kj
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
<motion.div className="min-h-screen flex flex-col items-center bg-black pt-24 text-white p-8">
      <section className="relative w-full h-[70vh] flex items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        >
          <source src="/collection.mp4" type="video/mp4" />
        </video>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-bold neon-glow">Explore Collections 🎬</h1>
          <p className="text-gray-200 text-lg mt-4 max-w-3xl mx-auto">
            Discover and download cinematic assets from top creators.
          </p>
        </motion.div>
      </section>

      <motion.div className="max-w-7xl w-full bg-black text-white p-8">
        <div className="flex justify-between items-center mt-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-red-400"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
        >
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <motion.div
                key={collection.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700 relative group overflow-hidden"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform"
                  >
                    <source src={collection.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-lg font-semibold">{collection.title}</h3>
                  <p className="text-sm text-gray-400">{collection.description}</p>
                </div>

                <div className="flex items-center justify-center mt-3">
                  <img
                    src={collection.creatorProfile}
                    alt="Creator"
                    className="w-8 h-8 rounded-full border border-red-500 mr-2"
                  />
                  <p className="text-gray-300 text-sm">{collection.creator}</p>
                </div>

                <div className="flex items-center justify-center mt-2 text-gray-400 text-sm">
                  <FaHeart className="text-red-500 mr-2" /> {collection.likes} Likes
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => navigate(`/collection/${collection.id}`)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                  >
                    <FaEye className="mr-2" /> View Collection
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-6">No collections found.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
