import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome, FaShoppingBag, FaListAlt } from "react-icons/fa";

export default function SuccessPage() {
  

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
     
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/90 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-700 max-w-lg w-full text-center"
      >
        <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold neon-glow">Payment Successful! 🎬</h1>
        <p className="text-gray-400 mt-2">Your purchase has been confirmed. Thank you for supporting our platform!</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Link to="/dashboard/my-collections" className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all">
            <FaListAlt className="mr-2" /> View Collection
          </Link>

          <Link to="/collections" className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-all">
            <FaShoppingBag className="mr-2" /> Continue Shopping
          </Link>

          <Link to="/dashboard" className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-all">
            <FaHome className="mr-2" /> Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
