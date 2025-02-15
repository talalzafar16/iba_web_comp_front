import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash, FaEye, FaDownload, FaShoppingCart } from "react-icons/fa";
import SideBar from "../../components/layout/SideBarLayout";

export default function FavoritePosts() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "LUT Pack",
      media: "/about-bg-1.mp4",
      type: "video",
      likes: 342,
      isPaid: false,
      price: 0,
      owner: { name: "John Doe", profilePic: "/profile1.jpg", id: 101 },
    },
    {
      id: 2,
      title: "4K City Night Footage",
      media: "/about-bg-2.mp4",
      type: "video",
      likes: 210,
      isPaid: true,
      price: 15,
      owner: { name: "Jane Smith", profilePic: "/profile2.jpg", id: 102 },
    },
    {
      id: 3,
      title: "Color Grading Sample",
      media: "/sample-image.jpg",
      type: "image",
      likes: 189,
      isPaid: false,
      price: 0,
      owner: { name: "Mark Wilson", profilePic: "/profile3.jpg", id: 103 },
    },
  ]);
// @ts-expect-error hj jk

  const handleRemoveFavorite = (postId) => {
    setFavorites(favorites.filter((post) => post.id !== postId));
  };
// @ts-expect-error hj jk

  const handleDownload = (post) => {
    if (!post.isPaid) {
      alert(`Downloading ${post.title}...`);
    }
  };
// @ts-expect-error hj jk
  const handlePurchase = (post) => {
    alert(`Redirecting to purchase ${post.title} for $${post.price}`);
  };

  return (
    <motion.div className="flex min-h-screen overflow-x-hidden pt-20 bg-black text-white">
      <SideBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-black text-white p-8 flex-1"
      >
        <h1 className="text-4xl font-bold text-center neon-glow">My Favorite Posts ❤️</h1>
        <p className="text-gray-400 text-center mt-2">View and manage your favorite posts.</p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
        >
          {favorites.length > 0 ? (
            favorites.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700 relative group overflow-hidden"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  {post.type === "video" ? (
                    <video
                      autoPlay
                      loop
                      muted
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform"
                    >
                      <source src={post.media} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={post.media} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                </div>

                <div className="flex items-center justify-center mt-2">
                  <img
                    src={post.owner.profilePic}
                    alt="Owner"
                    className="w-8 h-8 rounded-full border border-red-500 mr-2"
                  />
                  <p className="text-gray-300 text-sm">{post.owner.name}</p>
                </div>

                <div className="flex justify-center mt-2">
                  <p className="text-gray-300 text-sm flex items-center">
                    <FaHeart className="mr-1 text-red-400" /> {post.likes} Likes
                  </p>
                </div>

                <div className="absolute top-2 right-2 bg-gray-800 px-3 py-1 text-sm rounded-lg text-white">
                  {post.isPaid ? `$${post.price}` : "Free"}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Link to={`/post/${post.id}`}>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-all">
                      <FaEye className="mr-2" /> View Post
                    </button>
                  </Link>
                </div>

                <div className="flex justify-center mt-3 space-x-4">
                  {post.isPaid ? (
                    <button
                      onClick={() => handlePurchase(post)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                    >
                      <FaShoppingCart className="mr-2" /> Purchase
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownload(post)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                    >
                      <FaDownload className="mr-2" /> Download
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleRemoveFavorite(post.id)}
                  className="absolute top-2 left-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm flex items-center transition-all"
                >
                  <FaTrash className="mr-1" /> Remove
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-6">You have no favorite posts.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
