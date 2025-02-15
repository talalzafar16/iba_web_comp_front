import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/page";
import Layout from "../components/layout";
import About from "../pages/aboutUs/page";
// import Home from "../pages/Home";
// import Collections from "../pages/Collections";
// import Cinematographers from "../pages/Cinematographers";
// import Pricing from "../pages/Pricing";
// import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/collections" element={<Collections />} />
        <Route path="/cinematographers" element={<Cinematographers />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
        </Layout> {/* Navbar will always be visible */}
    </Router>
  );
}
