import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaTrash, FaEye } from "react-icons/fa";
import SideBar from "../../components/layout/SideBarLayout";
import MediaPreviewModal from "../../components/shared/MediaPreviewModal";
import { Link } from "react-router-dom";
import SERVER_URL from "../../confidential/index";
import axios from "axios";

export default function CollectionDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("x-token"); 
  const [collection,setCollections]=useState({})
  const [items,setItems] = useState([]);
  // const [loading, setLoading] = useState(false); 
  

  const [previewMedia, setPreviewMedia] = useState(null);

  useEffect(()=>{
    console.log(id)
    const fetch=async()=>{
      const res = await axios.get(`${SERVER_URL}/items/get_my_items_by_collection_id?collection_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     console.log(res,"res")
     setItems(res.data)
    }
    fetch()
  },[token,id])
useEffect(()=>{
  console.log(id)
  const fetch=async()=>{
    const res = await axios.get(`${SERVER_URL}/collections/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   setCollections(res.data)
  }
  fetch()
},[token,id])
 
// @ts-expect-error jk kj
  const handleDelete = (itemId) => {
    // @ts-expect-error jkj kjjk
    setItems(items.filter((item) => item.id !== itemId));
  };
  return (
    <motion.div className="flex min-h-screen overflow-x-hidden pt-20 bg-black text-white">
      <SideBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-black text-white flex-1"
      >
        <div className="relative w-full h-64 bg-gray-900 overflow-hidden">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        
            {/* @ts-expect-error jnk kj */}
            <source src={collection.videoUrl || "/about-bg-1.mp4"} type="video/mp4" />
          </video>
          <div className="mt-6 flex absolute z-[99] right-10 justify-center">
          <Link to={`/dashboard/add-item`} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center cursor-pointer transition-all">
            <FaCloudUploadAlt className="mr-2" /> Add Item
          </Link>
        </div>
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
            {/* @ts-expect-error jnk kj */}
            <h1 className="text-4xl font-bold neon-glow">{collection.title} 🎬</h1>
            {/* @ts-expect-error jnk kj */}
            <p className="text-gray-300 mt-2 max-w-2xl">{collection.description}</p>
          </div>
        </div>

        

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 p-8"
        >
          {items.length > 0 ? (
            items.map((item) => (
              <motion.div
              // @ts-expect-error jk nh 
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700 relative overflow-hidden"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                   {/* @ts-expect-error jk nh */}
                      <source src={item.videoUrl} type="video/mp4" />
                    </video>
                </div>

                   {/* @ts-expect-error jk nh */}
                <h3 className="text-lg font-semibold mt-3 text-center">{item.title}</h3>
                   {/* @ts-expect-error jk nh */}
                  <p className="text-gray-400 text-sm text-center mt-1">{item.description}</p>

                <div className="flex justify-between mt-4">
                  <button
// @ts-expect-error jk kj
                    onClick={() => setPreviewMedia(item.videoUrl)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition-all flex items-center"
                  >
                    <FaEye className="mr-2" /> View
                  </button>
                  <button
                  // @ts-expect-error jk nh
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm transition-all flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-6">No items in this collection.</p>
          )}
        </motion.div>
      </motion.div>

      <MediaPreviewModal media={previewMedia} onClose={() => setPreviewMedia(null)} />
    </motion.div>
  );
}
