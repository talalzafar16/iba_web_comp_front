import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
// import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    age: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

// @ts-expect-error kjh kj
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate Form Fields
  const validateForm = () => {
    const newErrors = {};
// @ts-expect-error kjh kj
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
// @ts-expect-error kjh kj
    if (!formData.email.trim()) newErrors.email = "Email Address is required.";
// @ts-expect-error kjh kj
    if (!formData.country.trim()) newErrors.country = "Country is required.";
// @ts-expect-error kjh kj
    if (!formData.age.trim()) newErrors.age = "Age is required.";
// @ts-expect-error kjh kj
    else if (isNaN(formData.age) || formData.age < 13) newErrors.age = "You must be at least 13 years old.";
// @ts-expect-error kjh kj
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// @ts-expect-error kjh kj
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    setLoading(true);
    setMessage("");

    try {
      // const response = await axios.post("https://your-api.com/signup", formData);
      setMessage("Sign-up successful! Redirecting...");

      setTimeout(() => {
        navigate("/auth/otp-verification");
      }, 1000);
    } catch (error) {
      setMessage("Sign-up failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full py-32 h-fit min-h-[70vh] flex items-center justify-center">
  
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/about-bg-2.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-black/80 p-10 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white text-center neon-glow">Join CineVerse</h2>
        <p className="text-gray-400 text-center mt-2">Create an account to explore & share cinematic assets.</p>

        <form className="mt-6 text-white space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              className="auth-input"
            />
{/* @ts-expect-error jk kj */}
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </div>

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
{/* @ts-expect-error jk kj */}
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleChange}
              className="auth-input"
            />
{/* @ts-expect-error jk kj */}
            {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="auth-input"
            />
{/* @ts-expect-error jk kj */}
            {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
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
{/* @ts-expect-error jk kj */}
{errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="auth-button hover:cursor-pointer" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {message && <p className="text-center text-gray-300 mt-2">{message}</p>}
        </form>

        <p className="text-gray-400 text-center mt-4">Or sign up with</p>
        <div className="flex justify-center space-x-4 mt-3">
          <SocialButton Icon={FaGoogle} text="Google" />
          <SocialButton Icon={FaFacebookF} text="Facebook" />
          <SocialButton Icon={FaTwitter} text="Twitter" />
        </div>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-red-400 hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// @ts-expect-error jk kj
function SocialButton({ Icon, text }) {
  return (
    <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-all">
      <Icon className="text-lg" />
      <span>{text}</span>
    </button>
  );
}
