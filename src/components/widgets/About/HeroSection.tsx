import { motion } from "framer-motion";

export default function AboutHeroSection() {
  return (
      <section className="relative w-full h-[70vh] flex items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        >
          <source src="/about-bg-1.mp4" type="video/mp4" />
        </video>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-bold neon-glow">About CineVerse</h1>
          <p className="text-gray-300 text-lg mt-2 max-w-3xl mx-auto">
            Your gateway to cinematic excellence. CineVerse empowers creators with high-quality collections, collaboration tools, and hiring services.
          </p>
        </motion.div>
      </section>

      
  );
}


