import { motion } from "framer-motion";
// @ts-expect-error h kj j
export default function TeamMember({ name, role, img }) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <img src={img} alt={name} className="w-32 h-32 mx-auto rounded-full border-4 border-red-500" />
        <h3 className="text-xl font-semibold mt-4">{name}</h3>
        <p className="text-gray-400">{role}</p>
      </motion.div>
    );
  }