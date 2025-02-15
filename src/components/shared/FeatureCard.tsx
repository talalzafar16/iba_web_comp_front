import { motion } from "framer-motion";
// @ts-expect-error ih jk
export default function FeatureCard({ icon: Icon, title, text }) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
      >
        <Icon className="text-4xl text-red-500 mx-auto mb-3" />
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400 mt-2">{text}</p>
      </motion.div>
    );
  }