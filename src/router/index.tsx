import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/page";
import Layout from "../components/layout";
import About from "../pages/aboutUs/page";
import SignUp from "../pages/auth/signup/page";
import OtpVerification from "../pages/auth/otp/page";
import Login from "../pages/auth/login/page";


export default function AppRouter() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/otp-verification" element={<OtpVerification />} />
      </Routes>
        </Layout>
    </Router>
  );
}
