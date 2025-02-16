import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFilm, FaUser, FaMapMarkerAlt, FaStar, FaBriefcase } from "react-icons/fa";

export default function Cinematographers() {

    const [cinematographers, setCinematographers] = useState([]);

    useEffect(() => {
        const fetchCinematographers = async () => {
            try {
                const response = await fetch("https://cineverse.flint.software/users/cinematographers");
                const data = await response.json();
                setCinematographers(data);
            } catch (error) {
                console.error("Error fetching cinematographers:", error);
            }
        };

        fetchCinematographers();
    }, []);

    return (
        <motion.div className="min-h-screen flex flex-col items-center bg-black pt-24 text-white">
            <section className="relative w-full h-[70vh] flex items-center justify-center text-center">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                >
                    <source src="/cinematographers.mp4" type="video/mp4" />

                </video>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 "
                >
                    <h1 className="text-5xl font-bold text-white neon-glow">Discover Top Cinematographers 🎥</h1>
                    <p className="text-gray-200 text-lg mt-4 max-w-3xl mx-auto">
                        Browse & hire the best cinematographers for your next project.
                    </p>
                </motion.div>
            </section>

            <div className="flex my-8 justify-center items-center ">

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
                    className="grid  max-w-6xl grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
                >
                    {cinematographers.length > 0 ? (
                        cinematographers.map((cinematographer) => (
                            <motion.div
                            // @ts-expect-error jkh knm
                                key={cinematographer._id}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-gray-700 relative group overflow-hidden"
                            >
                                <div className="flex items-center justify-center">
                                    {/*//  @ts-expect-error kh jk */}
                                    <img src={cinematographer?.profileImage || "https://img.freepik.com/free-vector/blond-man-with-eyeglasses-icon-isolated_24911-100831.jpg?ga=GA1.1.1472029081.1734517638&semt=ais_hybrid"} alt="Profile" className="w-20 h-20 rounded-full border-4 border-red-500" />
                
                                </div>

                                <div className="mt-4 text-center">
                                    {/*//  @ts-expect-error kh jk */}
                                    <h3 className="text-lg font-semibold">{cinematographer.name}</h3>
                                    {/*//  @ts-expect-error kh jk */}
                                    <p className="text-gray-400 text-sm mt-1">{cinematographer.bio ? cinematographer.bio : ""}</p>
                                </div>

                                <div className="mt-3 text-center text-gray-300 flex items-center justify-center">
                                    <FaMapMarkerAlt className="mr-2 text-red-400" />
                                    {/*//  @ts-expect-error kh jk */}
                                    <p className="text-sm">{cinematographer.country}</p>
                                </div>

                                <div className="mt-3 text-center text-gray-300">
                                    {/*//  @ts-expect-error kh jk */}
                                    <p className="text-sm">Expertise: {cinematographer?.skills?.join(" ")}</p>
                                </div>

                                <div className="flex justify-between mt-3 px-4">
                                    <p className="text-gray-300 text-sm flex items-center">
                                        {/*//  @ts-expect-error kh jk */}
                                        <FaStar className="mr-1 text-yellow-400" /> <a href={cinematographer?.website}>{cinematographer?.website} </a>
                                    </p>
                                    {/*//  @ts-expect-error kh jk */}
                                    <p className={`text-sm flex items-center ${cinematographer?.is_email_verified ? "text-green-400" : "text-gray-400"}`}>
                                        <FaBriefcase className="mr-1" />
                                        {/*//  @ts-expect-error kh jk */}
                                        {cinematographer.is_email_verified ? "Verified" : "Not Verified"}
                                    </p>
                                </div>

                                <div className="flex justify-between mt-3 px-4">
                                    <p className="text-gray-300 text-sm flex items-center">
                                        {/*//  @ts-expect-error kh jk */}
                                        <FaFilm className="mr-1 text-red-400" /> {cinematographer?.userCollections?.length} Collections
                                    </p>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                    {/*//  @ts-expect-error kh jk */}
                                    <Link to={`/user-profile/${cinematographer?._id}`}>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center transition-all">
                                            <FaUser className="mr-2" /> View Profile
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full mt-6">No cinematographers found.</p>
                    )}
                </motion.div>
            </div>

        </motion.div>
    );
}
