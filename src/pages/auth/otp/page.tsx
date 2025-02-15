import { useState, useRef, useEffect } from "react";
// import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const navigate=useNavigate()
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

// @ts-expect-error  kj j n
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
       // @ts-expect-error  kj j n
      inputRefs.current[index + 1].focus();
    }
  };

// @ts-expect-error  kj j n
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      setMessage("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
    //   const response = await axios.post("https://your-api.com/verify-otp", {
    //     otp: enteredOtp,
    //   });

      setMessage("OTP Verified Successfully! Redirecting...");
    //   console.log(response.data);
      setTimeout(()=>{
        navigate("/auth/login")
    },1000)
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleResendOtp = () => {
    setResendTimer(30);
    setMessage("A new OTP has been sent to your email.");
  };

  return (
    <div className="relative py-32 h-fit min-h-[70vh] w-full flex items-center justify-center">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover opacity-80">
        <source src="/otp-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-black/80 p-10 rounded-lg shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-white neon-glow">Verify OTP</h2>
        <p className="text-gray-400 mt-2">Enter the 6-digit code sent to your email.</p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
// @ts-expect-error jk hb
ref={(el) => (inputRefs.current[index] = el)}
type="text"
// @ts-expect-error jk hb
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="otp-input"
              />
            ))}
          </div>

          {message && <p className="text-red-400 text-sm mt-3">{message}</p>}

          <button type="submit" className="auth-button mt-6" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-gray-400 mt-4">
          Didn't receive OTP?{" "}
          <button
            className={`text-red-400 hover:underline ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={resendTimer > 0}
            onClick={handleResendOtp}
          >
            Resend OTP {resendTimer > 0 ? `in ${resendTimer}s` : ""}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
