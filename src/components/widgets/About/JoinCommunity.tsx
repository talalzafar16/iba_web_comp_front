import { motion } from "framer-motion";


const JoinCommunity = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-center">
    <h2 className="text-3xl font-semibold neon-glow">Join the CineVerse Community</h2>
    <p className="text-gray-400 mt-2">Start sharing and monetizing your cinematic work today.</p>
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="mt-6 bg-red-500 hover:cursor-pointer text-white px-6 py-3 rounded-full text-lg hover:bg-red-600 transition-all"
    >
      Get Started
    </motion.button>
  </section>
  )
}

export default JoinCommunity