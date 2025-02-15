import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart, FaFilm, FaUser, FaMapMarkerAlt, FaStar, FaBriefcase } from "react-icons/fa";

export default function Cinematographers() {
  const [cinematographers] = useState([
    {
      id: 1,
      name: "John Doe",
      profilePic: "/pic2.jpg",
      bio: "Award-winning cinematographer specializing in feature films and commercials.",
      expertise: "Feature Films, Commercials",
      location: "Los Angeles, USA",
      totalLikes: 1_245,
      collections: 12,
      rating: 4.8,
      available: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "/pic2.jpg",
      bio: "Specialist in wedding cinematography and travel films.",
      expertise: "Weddings, Travel Films",
      location: "New York, USA",
      totalLikes: 980,
      collections: 8,
      rating: 4.5,
      available: false,
    },
    {
      id: 3,
      name: "Mark Wilson",
      profilePic: "/pic2.jpg",
      bio: "VFX and color grading expert with a passion for storytelling.",
      expertise: "VFX, Color Grading",
      location: "London, UK",
      totalLikes: 750,
      collections: 5,
      rating: 4.7,
      available: true,
    },
  ]);

  return (
    <motion.div className="min-h-screen flex flex-col items-center bg-black pt-24 text-white"> 
        <section className="relative w-full h-[70vh] flex items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        >
            <source src="/cinematographers.mp4" type="video/mp4" />

        </video>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 "
        >
         <h1 className="text-5xl font-bold text-white neon-glow">Discover Top Cinematographers 🎥</h1>
            <p className="text-gray-200 text-lg mt-4 max-w-3xl mx-auto">
              Browse & hire the best cinematographers for your next project.
            </p>
        </motion.div>
      </section>
 
    <div className="flex my-8 justify-center items-center ">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="grid  max-w-6xl grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
        >
          {cinematographers.length > 0 ? (
            cinematographers.map((cinematographer) => (
              <motion.div
                key={cinematographer.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-gray-700 relative group overflow-hidden"
              >
                <div className="flex items-center justify-center">
                  <img src={cinematographer.profilePic} alt="Profile" className="w-20 h-20 rounded-full border-4 border-red-500" />
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold">{cinematographer.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{cinematographer.bio}</p>
                </div>

                <div className="mt-3 text-center text-gray-300 flex items-center justify-center">
                  <FaMapMarkerAlt className="mr-2 text-red-400" />
                  <p className="text-sm">{cinematographer.location}</p>
                </div>

                <div className="mt-3 text-center text-gray-300">
                  <p className="text-sm">Expertise: {cinematographer.expertise}</p>
                </div>

                <div className="flex justify-between mt-3 px-4">
                  <p className="text-gray-300 text-sm flex items-center">
                    <FaStar className="mr-1 text-yellow-400" /> {cinematographer.rating} Rating
                  </p>
                  <p className={`text-sm flex items-center ${cinematographer.available ? "text-green-400" : "text-gray-400"}`}>
                    <FaBriefcase className="mr-1" />
                    {cinematographer.available ? "Available" : "Booked"}
                  </p>
                </div>

                <div className="flex justify-between mt-3 px-4">
                  <p className="text-gray-300 text-sm flex items-center">
                    <FaHeart className="mr-1 text-red-400" /> {cinematographer.totalLikes} Likes
                  </p>
                  <p className="text-gray-300 text-sm flex items-center">
                    <FaFilm className="mr-1 text-red-400" /> {cinematographer.collections} Collections
                  </p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Link to={`/user-profile/${cinematographer.id}`}>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center transition-all">
                      <FaUser className="mr-2" /> View Profile
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-6">No cinematographers found.</p>
          )}
        </motion.div>
    </div>

    </motion.div>
  );
}
