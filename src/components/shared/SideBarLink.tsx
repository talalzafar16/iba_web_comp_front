// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// @ts-expect-error k mkj
export default function SidebarLink({ icon: Icon, text, route }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={handleNavigation}
      className="flex items-center space-x-3 py-3 px-4 text-gray-300 hover:bg-red-500 hover:text-white rounded-lg cursor-pointer transition-all"
    >
      <Icon className="text-lg" />
      <span className="font-medium">{text}</span>
    </motion.div>
  );
}
