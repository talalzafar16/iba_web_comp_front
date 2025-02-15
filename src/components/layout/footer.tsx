import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-b from-black via-gray-900 to-black py-12 text-gray-400 relative"
    >
      {/* Glowing Divider Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-11/12 h-1 bg-red-500 blur-lg"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="text-4xl font-bold text-white tracking-wider neon-glow">
              🎬 CineVerse
            </Link>
            <p className="mt-3 text-gray-500">
              Your Ultimate Hub for Cinematic Collections & Hiring Professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/collections" text="Collections" />
              <FooterLink to="/cinematographers" text="Cinematographers" />
              <FooterLink to="/pricing" text="Pricing" />
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <SocialIcon href="#" Icon={FaFacebookF} />
              <SocialIcon href="#" Icon={FaTwitter} />
              <SocialIcon href="#" Icon={FaInstagram} />
              <SocialIcon href="#" Icon={FaYoutube} />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
          © {new Date().getFullYear()} CineVerse. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}

// Footer Link Component with Underline Glow
// @ts-expect-error h hj

function FooterLink({ to, text }) {
  return (
    <li>
      <Link
        to={to}
        className="relative text-gray-400 hover:text-red-400 transition-all duration-300"
      >
        {text}
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-red-500 transition-all duration-300 hover:w-full"></span>
      </Link>
    </li>
  );
}

// @ts-expect-error h hj
function SocialIcon({ href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 text-xl hover:text-red-400 transition-all duration-300 transform hover:scale-110"
    >
      <Icon />
    </a>
  );
}
