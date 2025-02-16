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
  const [refetch,setReftech]=useState(false)
  // const [loading, setLoading] = useState(false); 
  const [collection,setCollections] = useState({
    id,
    title: "Cinematic LUT Pack",
    description: "A collection of high-quality LUTs for cinematic grading.",
    coverVideo: "/about-bg-1.mp4",
    items: [
        { id: 1, title: "LUT 1", description: "A cool cinematic LUT for film editing.", type: "video", src: "/about-bg-1.mp4" },
        { id: 2, title: "LUT 2", description: "Perfect for night shots and moody scenes.", type: "video", src: "/about-bg-2.mp4" },
        { id: 3, title: "Image Sample", description: "A beautiful high-resolution stock image.", type: "image", src: "/pic2.jpg" },
      ],
  });
  

  const [items, setItems] = useState(collection.items);
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
     setCollections(res.data)
    }
    fetch()
  },[refetch,token])
// @ts-expect-error jk kj
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type.startsWith("video/") ? "video" : "image";

    const newItemObj = {
      id: items.length + 1,
      title: file.name,
      type: fileType,
      src: URL.createObjectURL(file),
    };
// @ts-expect-error kmlj lk
    setItems([...items, newItemObj]);
  };
// @ts-expect-error jk kj
  const handleDelete = (itemId) => {
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
            <source src={collection.coverVideo} type="video/mp4" />
          </video>
          <div className="mt-6 flex absolute z-[99] right-10 justify-center">
          <Link to={`/dashboard/add-item`} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center cursor-pointer transition-all">
            <FaCloudUploadAlt className="mr-2" /> Add Item
            <input type="file" onChange={handleUpload} className="hidden" />
          </Link>
        </div>
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold neon-glow">{collection.title} 🎬</h1>
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
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700 relative overflow-hidden"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  {item.type === "video" ? (
                    <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-3 text-center">{item.title}</h3>
                <p className="text-gray-400 text-sm text-center mt-1">{item.description}</p>

                <div className="flex justify-between mt-4">
                  <button
// @ts-expect-error jk kj
                    onClick={() => setPreviewMedia(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition-all flex items-center"
                  >
                    <FaEye className="mr-2" /> View
                  </button>
                  <button
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
