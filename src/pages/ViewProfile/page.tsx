import { useState } from "react";
import { motion } from "framer-motion";
import {  Link } from "react-router-dom";
import { FaFilm, FaHeart, FaUser, FaGlobe, FaCalendar } from "react-icons/fa";

export default function PublicProfile() {
//   const { id } = useParams(); 


  const [creator] = useState({
    name: "John Doe",
    profilePic: "/pic2.jpg",
    country: "United States",
    age: 32,
    joinDate: "March 2021",
    bio: "Professional Cinematographer & Content Creator. Sharing high-quality cinematic assets.",
    totalLikes: 1245,
    collections: [
      {
        id: 1,
        title: "Cinematic LUT Pack",
        video: "/about-bg-1.mp4",
        likes: 342,
      },
      {
        id: 2,
        title: "4K Stock Footage - City Night",
        video: "/about-bg-2.mp4",
        likes: 210,
      },
      {
        id: 3,
        title: "Premium After Effects Template",
        video: "/about-bg-1.mp4",
        likes: 189,
      },
    ],
  });

  return (
    <motion.div className="min-h-screen pt-24 bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700"
      >
        <img
          src={creator.profilePic}
          alt="Creator"
          className="w-28 h-28 rounded-full border-4 border-red-500"
        />
        <h1 className="text-3xl font-bold mt-4">{creator.name}</h1>
        <p className="text-gray-400 text-center mt-2 max-w-xl">{creator.bio}</p>

        <div className="flex flex-wrap justify-center mt-4 space-x-6 text-gray-300 text-lg">
          <p className="flex items-center">
            <FaGlobe className="mr-2 text-blue-400" /> {creator.country}
          </p>
          <p className="flex items-center">
            <FaUser className="mr-2 text-green-400" /> {creator.age} years old
          </p>
          <p className="flex items-center">
            <FaCalendar className="mr-2 text-yellow-400" /> Joined {creator.joinDate}
          </p>
        </div>

        <div className="mt-3 flex items-center space-x-2 text-gray-300 text-lg">
          <FaHeart className="text-red-400" />
          <p>{creator.totalLikes} Total Likes</p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="mt-10"
      >
        <h2 className="text-3xl font-bold text-center neon-glow">Top Collections 🎬</h2>
        <p className="text-gray-400 text-center mt-2">Explore the best works by {creator.name}.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {creator.collections.map((collection) => (
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
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <Link
                    to={`/collection/${collection.id}`}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                  >
                    <FaFilm className="mr-2" /> View Collection
                  </Link>
                </div>
              </div>

              {/* Collection Info */}
              <div className="mt-3 text-center">
                <h3 className="text-lg font-semibold">{collection.title}</h3>
                <p className="text-gray-400 text-sm flex items-center justify-center mt-1">
                  <FaHeart className="text-red-400 mr-1" /> {collection.likes} Likes
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
