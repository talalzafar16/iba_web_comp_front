

import { useState } from "react";
import {
  FaFilm,
  FaCloudUploadAlt,
  FaUserEdit,
  FaCogs,
  // FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

import SidebarLink from "../shared/SideBarLink";

export default function SideBar() {
  // const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  return (
    <div>
      <button
        className="absolute z-[999] top-14 left-24 text-white text-2xl md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-gray-900/90 backdrop-blur-lg p-6 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-50 overflow-y-auto`}
      >
        {/* <h2 className="text-2xl font-bold text-red-400 text-center">CineVerse 🎥</h2> */}
        <nav className="mt-6 space-y-3">
          <SidebarLink icon={FaFilm} text="Overview" route={"/dashboard"} />
          <SidebarLink
            icon={FaFilm}
            text="My Collections"
            route={"/dashboard/my-collection"}
          />
          <SidebarLink
            icon={FaHeart}
            text="Favourite Collections"
            route={"/dashboard/favourite-collections"}
          />
          <SidebarLink
            icon={FaHandHoldingHeart}
            text="Favourite Posts"
            route={"/dashboard/favourite-posts"}
          />
          <SidebarLink
            icon={FaCloudUploadAlt}
            text="Upload Post"
            route={"/dashboard/add-item"}
          />
          <SidebarLink
            icon={FaUserEdit}
            text="Edit Profile"
            route={"/dashboard/edit-profile"}
          />
          <SidebarLink
            icon={FaCogs}
            text="Settings"
            route={"/dashboard/settings"}
          />
          
        </nav>
      </aside>
    </div>
  );
}





