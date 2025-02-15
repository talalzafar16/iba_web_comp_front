import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaDownload,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";


import  SERVER_URL  from "../../confidential/index";
export default function PublicCollectionDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("x-token");
  const [collection,setCollections]=useState({})
  const [items,setItems] = useState([]);


  const handleToggleFavoriteCollection = async () => {
    try {
      await axios.post(`${SERVER_URL}/collections/${id}/favorite`);
                // @ts-expect-error jknkjb jkkj
      setCollection((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };
  // @ts-expect-error hkbvkjb bkjbj
  const handleToggleFavoriteItem = async (itemId) => {
    try {
      await axios.post(`${SERVER_URL}/items/${itemId}/favorite`);
      setCollection((prev:any) => ({
        ...prev,
        items: prev.items.map((item:any) =>
          item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating item favorite status:", error);
    }
  };

  // @ts-expect-error hkbvkjb 
  const handleDownload = (item) => {
    if (!item.isPaid) {
      window.location.href = `${SERVER_URL}/items/${item.id}/download`;
    }
  };

  useEffect(()=>{
    console.log(id)
    const fetch=async()=>{
      const res = await axios.get(`${SERVER_URL}/items/get_my_items_by_collection_id?collection_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// @ts-expect-error kbgj kjh
  const handlePurchase = (item) => {
    alert(`Redirecting to purchase ${item.title} for $${item.price}`);
  };

  // if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  // if (!collection)
  //   return <p className="text-center text-gray-300">Collection not found.</p>;

  return (
    <motion.div className="min-h-screen pt-24 bg-black text-white p-8">
      <section className="relative w-full h-[70vh] flex items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        >
          {/* @ts-expect-error kjbjb bjk */}
          <source src={collection.videoUrl||"/collection.mp4"} type="video/mp4" />
        </video>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex justify-center flex-col items-center"
        >
          <h1 className="text-5xl font-bold text-white neon-glow">
            {
              //  @ts-expect-error bjkbjk
              collection.title
            }{" "}
            🎬
          </h1>
          <p className="text-gray-200 text-lg mt-2">
            {
              // @ts-expect-error bjkbjk
              collection.description
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleFavoriteCollection}
            className={`mt-4 px-6 py-3 w-fit rounded-lg text-lg font-semibold flex items-center transition-all ${
              // @ts-expect-error bjkbjk
              collection.isFavorite
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <FaHeart className="mr-2" />

            {
              // @ts-expect-error bjkbjk
              collection.isFavorite
                ? "Remove from Favorites"
                : "Add to Favorites"
            }
          </motion.button>
        </motion.div>
      </section>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {
          items?.map((item) => (
            <motion.div
            // @ts-expect-error jkhkj 
              key={item._id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/80 p-4 rounded-lg shadow-lg"
            >
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                   {/* @ts-expect-error jk nh */}
                      <source src={item.plan=="premium"?item.watermarkedVideoUrl:item.videoUrl} type="video/mp4" />
                    </video>
                </div>
              <h3 className="text-lg font-semibold text-center">
                {/* @ts-expect-error jkbkjbkj */}
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm text-center">
                {/* @ts-expect-error jkbkjbkj */}
                {item.plan}
              </p>
              <div className="flex justify-center mt-2">
                <motion.button
                // @ts-expect-error jknkjb jkb
                  onClick={() => handleToggleFavoriteItem(item.id)}
                  whileTap={{ scale: 0.9 }}
                  className={`text-sm flex items-center transition-all ${
            // @ts-expect-error jkhkj 
  
                    item.isFavorite ? "text-red-500" : "hover:text-red-500"
                  }`}
                >
                  <FaHeart className="mr-1" />{" "}
                {/* @ts-expect-error jkbkjbkj */}

                  {item.isFavorite ? "Remove from Favorites" : "Like"} (
                {/* @ts-expect-error jkbkjbkj */}
                
                  {item.likes.length})
                </motion.button>

              </div>
              <div className="flex justify-center mt-3 space-x-4">
                {/* @ts-expect-error jkbkjbkj */}
                {item.plan=="premium" ? (
                  <button
                    onClick={() => handlePurchase(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                  >
                    <FaShoppingCart className="mr-2" /> Purchase
                  </button>
                ) : (
                  <button
                    onClick={() => handleDownload(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                  >
                    <FaDownload className="mr-2" /> Download
                  </button>
                )}
              </div>
            </motion.div>
          ))
        }
      </motion.div>
    </motion.div>
  );
}
