import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFilm,
  FaCloudUploadAlt,
  FaDownload,
} from "react-icons/fa";
import SideBar from "../../components/layout/SideBarLayout";

export default function UserDashboard() {
  const [user] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    country: "United States",
    age: 28,
  });

  const [stats] = useState({
    collections: 12,
    downloads: 30,
    purchases: 5,
    uploads: 8,
  });

  return (
    <motion.div 
    //   initial={{ opacity: 0 }} 
    //   animate={{ opacity: 1 }} 
    //   transition={{ duration: 1 }} 
      className="flex min-h-screen pt-20 bg-black text-white"
    >
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <SideBar />
      </motion.div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex-1 p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold neon-glow">Welcome, {user.name} 🎬</h1>
          <p className="text-gray-400 mt-2">Manage your cinematic collections, uploads, and downloads.</p>
        </motion.div>

        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        >
          <StatCard title="My Collections" count={stats.collections} icon={FaFilm} />
          <StatCard title="Downloads" count={stats.downloads} icon={FaDownload} />
          <StatCard title="Purchases" count={stats.purchases} icon={FaCloudUploadAlt} />
          <StatCard title="Uploads" count={stats.uploads} icon={FaCloudUploadAlt} />
        </motion.section>

        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
          className="mt-10"
        >
          <h2 className="text-2xl font-semibold neon-glow">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            <ActivityItem text="Downloaded 'Cinematic LUT Pack'" />
            <ActivityItem text="Uploaded '4K Stock Footage - City Night'" />
            <ActivityItem text="Purchased 'Premium After Effects Template'" />
            <ActivityItem text="Updated profile information" />
          </div>
        </motion.section>
      </motion.main>
    </motion.div>
  );
}
// @ts-expect-error h jkn jk
function StatCard({ title, count, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-lg shadow-xl text-center border border-gray-700"
    >
      <Icon className="text-4xl text-red-500 mx-auto" />
      <h3 className="text-xl font-semibold mt-3">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{count}</p>
    </motion.div>
  );
}

// @ts-expect-error h jkn jk
function ActivityItem({ text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700"
    >
      <p className="text-gray-300">{text}</p>
    </motion.div>
  );
}
