import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import SERVER_URL from "../../../confidential/index";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // @ts-expect-error kh jk
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    // @ts-expect-error kh jk
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    // @ts-expect-error kh jk
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  @ts-expect-error kh jk

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${SERVER_URL}/auth/user/signin`,
        formData
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setMessage("Login successful! Redirecting...");
      // localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjA3MzQ5NmViMWEzOGQwYzE0YWMxMSIsImVtYWlsIjoidXNtYW4uMTI3LjAuMC4xQGdtYWlsLmNvbSIsImlzX2VtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE3Mzk2NzQwMTN9.aJ32QvBMwQJyrNddFPD0md7RRgjIFxyk8NQTXxQ7Zas");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      console.log(response.data);
    } catch (error) {
      setMessage("Invalid email or password.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-32 h-fit min-h-[70vh] w-full  flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover "
      >
        <source src="/about-bg-1.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-black/80 p-10 rounded-lg shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-white neon-glow">
          Welcome Back
        </h2>
        <p className="text-gray-400 mt-2">
          Login to access your CineVerse account.
        </p>

        <form className="mt-6 text-white space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
            />
            {/* @ts-expect-error kh jk */}
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors?.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input pr-12"
              />
              <span
                className="absolute right-4 top-3 text-gray-500 cursor-pointer hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
            {/* @ts-expect-error kh jk */}
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="auth-button mt-6 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <p className="text-center text-gray-300 mt-2">{message}</p>
          )}
        </form>

        <p className="text-gray-400 text-center mt-4">Or login with</p>
        <div className="flex justify-center space-x-4 mt-3">
          <SocialButton Icon={FaGoogle} text="Google" />
          <SocialButton Icon={FaFacebookF} text="Facebook" />
          <SocialButton Icon={FaTwitter} text="Twitter" />
        </div>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-red-400 cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

//  @ts-expect-error kh jk

function SocialButton({ Icon, text }) {
  return (
    <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-all">
      <Icon className="text-lg" />
      <span>{text}</span>
    </button>
  );
}
