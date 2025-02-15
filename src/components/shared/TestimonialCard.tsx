import { motion } from "framer-motion";
// @ts-expect-error h kj j
export default function TestimonialCard({ name, text }) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <p className="text-gray-300">"{text}"</p>
        <h3 className="text-lg font-semibold text-red-400 mt-2">- {name}</h3>
      </motion.div>
    );
  }