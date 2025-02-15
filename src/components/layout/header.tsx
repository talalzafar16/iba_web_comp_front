import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { motion } from "framer-motion";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolling
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-black via-gray-900 to-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo with Glow Effect */}
        <Link to="/" className="text-3xl font-bold text-white tracking-wider neon-glow">
          🎬 CineVerse
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
 {/* @ts-expect-error j bjk */}
<StyledNavLink to="/" text="Home" />
 {/* @ts-expect-error j bjk */}
          <StyledNavLink to="/about" text="About Us" />
 {/* @ts-expect-error j bjk */}
          <StyledNavLink to="/collections" text="Collections" />
 {/* @ts-expect-error j bjk */}
          <StyledNavLink to="/cinematographers" text="Cinematographers" />
        </div>

        {/* Call to Action Buttons */}
        <div className="hidden md:flex space-x-4">
          <Button onClick={()=>

        navigate("/auth/login")

          } ghost className="!border-red-500 !text-red-400 hover:!bg-[#ff4d4d] hover:!text-white !transition-all">
            Login
          </Button>
          <Button onClick={()=>navigate("/auth/signup")} className="!bg-[#ff4d4d] !text-white !border-none hover:!bg-red-600 !transition-all">
  Sign Up
</Button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-black text-white shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <StyledNavLink to="/" text="Home" onClick={() => setMobileMenu(false)} />
            <StyledNavLink to="/about" text="About Us" onClick={() => setMobileMenu(false)} />
            <StyledNavLink to="/collections" text="Collections" onClick={() => setMobileMenu(false)} />
            <StyledNavLink to="/cinematographers" text="Cinematographers" onClick={() => setMobileMenu(false)} />
            <Button ghost className="!border-red-500 !text-red-400">Login</Button>
            <Button type="primary" className="!bg-red-500 !border-none">Sign Up</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// Styled NavLink Component with Neon Glow Effect
// @ts-expect-error j bjk
function StyledNavLink({ to, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative text-white text-base font-medium transition-all duration-300 px-4 py-2 ${
          isActive ? "text-red-400 border-b-2 border-red-400 pb-1 neon-glow" : "hover:text-red-400"
        }`
      }
    >
      {text}
    </NavLink>
  );
}
