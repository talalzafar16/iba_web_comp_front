import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDownload, FaShoppingCart, FaUser, FaHeart, FaEye } from "react-icons/fa";

export default function PublicCollectionDetails() {
  const { id } = useParams();

  const [collection, setCollection] = useState({
    id,
    title: "Cinematic LUT Pack",
    description: "A collection of high-quality LUTs for cinematic grading.",
    creator: { name: "John Doe", profilePic: "/pic2.jpg", id: 1 },
    totalLikes: 342,
    likedBy: ["Alice", "Bob", "Charlie", "David"],
    isFavorite: false,
    items: [
      { id: 1, title: "LUT 1", type: "video", src: "/about-bg-1.mp4", isPaid: false, price: 0, likes: 150, isFavorite: false },
      { id: 2, title: "LUT 2", type: "video", src: "/about-bg-2.mp4", isPaid: true, price: 15, likes: 89, isFavorite: false },
      { id: 3, title: "Color Grading Sample", type: "image", src: "/sample-image.jpg", isPaid: false, price: 0, likes: 210, isFavorite: false },
      { id: 4, title: "After Effects Preset", type: "video", src: "/about-bg-1.mp4", isPaid: true, price: 25, likes: 97, isFavorite: false },
    ],
  });

  const handleToggleFavoriteCollection = () => {
    setCollection({ ...collection, isFavorite: !collection.isFavorite });
  };

// @ts-expect-error jk khj
  const handleToggleFavoriteItem = (itemId) => {
    setCollection({
      ...collection,
      items: collection.items.map((item) =>
        item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
      ),
    });
  };
// @ts-expect-error jk khj
const handleDownload = (item) => {
    if (!item.isPaid) {
        alert(`Downloading ${item.title}...`);
    }
};

// @ts-expect-error jk khj
  const handlePurchase = (item) => {
    alert(`Redirecting to purchase ${item.title} for $${item.price}`);
  };

  return (
    <motion.div className="min-h-screen pt-24 bg-black text-white p-8">
      {/* Collection Header */}
      <section className="relative w-full h-[70vh] flex items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        >
          <source src="/collection.mp4" type="video/mp4" />
        </video>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 flex justify-center flex-col items-center">
          <h1 className="text-5xl font-bold text-white neon-glow">{collection.title} 🎬</h1>
          <p className="text-gray-200 text-lg mt-2">{collection.description}</p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleFavoriteCollection}
            className={`mt-4 px-6 py-3 w-fit rounded-lg text-lg font-semibold flex items-center transition-all ${
              collection.isFavorite ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <FaHeart className="mr-2" /> {collection.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </motion.button>
        </motion.div>
      </section>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mt-6 flex flex-col md:flex-row md:justify-between items-center bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="flex items-center space-x-3">
          <img src={collection.creator.profilePic} alt="Creator" className="w-12 h-12 rounded-full border border-red-500" />
          <p className="text-gray-300 text-lg flex items-center">
            <FaUser className="mr-2 text-red-400" /> Owned by: {collection.creator.name}
          </p>
        </div>

        <div className="mt-3 md:mt-0 text-center md:text-right">
          <p className="text-gray-300 text-lg flex items-center justify-center md:justify-end">
            <FaHeart className="mr-2 text-red-400" /> {collection.totalLikes} Likes
          </p>
          <p className="text-gray-500 text-sm">Liked by {collection.likedBy.slice(0, 3).join(", ")} & more</p>
        </div>

        <Link to={`/user-profile/${collection.creator.id}`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center transition-all mt-4 md:mt-0"
          >
            <FaEye className="mr-2" /> View Profile
          </motion.button>
        </Link>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {collection.items.length > 0 ? (
          collection.items.map((item) => (
            <motion.div key={item.id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700 relative group overflow-hidden">
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                {item.type === "video" ? (
                  <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
              </div>

              <div className="mt-3 text-center">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.isPaid ? "Premium Item" : "Free Resource"}</p>
              </div>

              <div className="flex justify-center mt-2">
                <motion.button onClick={() => handleToggleFavoriteItem(item.id)} whileTap={{ scale: 0.9 }} className={`text-gray-300 text-sm flex items-center transition-all ${item.isFavorite ? "text-red-500" : "hover:text-red-500"}`}>
                  <FaHeart className="mr-1" /> {item.isFavorite ? "Remove from Favorites" : "Like"} ({item.likes})
                </motion.button>
              </div>

              <div className="flex justify-center mt-3 space-x-4">
                {item.isPaid ? (
                  <button onClick={() => handlePurchase(item)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center transition-all">
                    <FaShoppingCart className="mr-2" /> Purchase
                  </button>
                ) : (
                  <button onClick={() => handleDownload(item)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-all">
                    <FaDownload className="mr-2" /> Download
                  </button>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-6">No items in this collection.</p>
        )}
      </motion.div>
    </motion.div>
  );
}
