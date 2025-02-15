import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/page";
import Layout from "../components/layout";
import About from "../pages/aboutUs/page";
import SignUp from "../pages/auth/signup/page";
import OtpVerification from "../pages/auth/otp/page";
import Login from "../pages/auth/login/page";
import UserDashboard from "../pages/userDashboard/page";
import MyCollections from "../pages/MyCollection/page";
import CollectionDetails from "../pages/CollectionDetail/page";
import AddItem from "../pages/add-item/page";
import EditProfile from "../pages/edit-profile/page";
import Settings from "../pages/settings/page";


export default function AppRouter() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/add-item" element={<AddItem />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/edit-profile" element={<EditProfile />} />
        <Route path="/dashboard/collection/:id" element={<CollectionDetails />} />
        <Route path="/dashboard/my-collection" element={<MyCollections />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/otp-verification" element={<OtpVerification />} />
      </Routes>
        </Layout>
    </Router>
  );
}
