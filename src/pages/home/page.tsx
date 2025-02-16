import { Button, Card, Carousel } from "antd";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { PlayCircleOutlined, FireOutlined } from "@ant-design/icons";

export default function Home() {
  const heroRef = useRef(null);

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

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-black text-white">
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
        <img
          src="/heroimage.jpg"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />

        <div ref={heroRef} className="relative z-10 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-5xl font-bold neon-glow"
          >

            Discover. Create. Monetize Your Cinematic Vision.
          </motion.h1>
          <p className="text-lg text-gray-300 mt-4">
            A home for filmmakers, cinematographers, and content creators.
          </p>
          <div className="mt-6 flex space-x-4">
            <Button
              shape="round"
              size="large"
              icon={<FireOutlined />}
              className="!bg-[#ff4d4d] !border-[#ff4d4d] !text-white hover:!bg-[#ff4d4d]/90 hover:!border-orange-400"
            >
              Explore Collections
            </Button>

            <Button
              shape="round"
              size="large"
              ghost
              icon={<PlayCircleOutlined />}
              className="!border-white text-white hover:bg-white hover:!text-[#ff4d4d]  hover:!border-[#ff4d4d]"
            >
              Join as a Creator
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Collections */}
      <section className="py-20 px-10">
       
        <h2 className="text-4xl font-semibold text-center mb-8 neon-glow">🔥 Trending Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              videosrc: "/cinematic-video-1.mp4",
              title: "Serene Sunset by the River",
              likeCount: 245,
              videographer: {
                name: "Alex Carter",
                profilePicture: "/man (27).jpg",
              },
            },
            {
              videosrc: "/cinematic-video-2.mp4",
              title: "Tranquil Docks at Twilight",
              likeCount: 312,
              videographer: {
                name: "Emma Johnson",
                profilePicture: "/emma.jpg",
              },
            },
            {
              videosrc: "/cinematic-video-3.mp4",
              title: "Golden Hour with Birds",
              likeCount: 278,
              videographer: {
                name: "Ryan Smith",
                profilePicture: "/man (32).jpg",
              },
            },
            {
              videosrc: "/cinematic-video-4.mp4",
              title: "Misty Train Journey through the Hills",
              likeCount: 189,
              videographer: {
                name: "Sophia Martinez",
                profilePicture: "/woman (9).jpg",
              },
            },
            {
              videosrc: "/cinematic-video-5.mp4",
              title: "Blossoming Cliffs at Sunrise",
              likeCount: 354,
              videographer: {
                name: "Liam Wilson",
                profilePicture: "/man (42).jpg",
              },
            },
            {
              videosrc: "/cinematic-video-6.mp4",
              title: "Winding Road through the Mountains",
              likeCount: 401,
              videographer: {
                name: "Olivia Brown",
                profilePicture: "/olivia.png",
              },
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900"
            >
              <video
                src={item.videosrc}
                className="w-full h-90 object-cover rounded-lg"
                autoPlay
                loop
                muted
              ></video>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white rounded-b-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={item.videographer.profilePicture}
                    alt={item.videographer.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-300">
                      By {item.videographer.name}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-gray-300">❤️ {item.likeCount} Likes</p>
                  <Button type="primary" ghost size="small">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Cinematographers */}
      <section className="py-20 px-10 bg-gray-900">
        <h2 className="text-4xl font-semibold text-center mb-8 neon-glow"> 🎥 Featured Cinematographers</h2>

        <Carousel autoplay className="max-w-3xl mx-auto">
        {cinematographers.map((cinematographer,idx) => (
          <div key={idx} className="p-6">
            <Card className="bg-red-400 text-white text-center border-none">
              <img
                /* @ts-expect-error */ 
                src={cinematographer?.profileImage || "https://img.freepik.com/free-vector/blond-man-with-eyeglasses-icon-isolated_24911-100831.jpg?ga=GA1.1.1472029081.1734517638&semt=ais_hybrid"}
                /* @ts-expect-error */ 
                alt={cinematographer?.name}
                className="w-32 h-32 mx-auto rounded-full"
              />
                {/*//  @ts-expect-error kh jk */} 
              <h3 className="text-xl mt-4 font-semibold">{cinematographer?.name}</h3>
                {/*//  @ts-expect-error kh jk */} 
              <p className="text-gray-400">{cinematographer?.userCollections?.length} Collections</p>
              <Button type="primary" className="mt-3">
                Hire Me
              </Button>
            </Card>
          </div>
        ))}
        </Carousel>
      </section>

      {/* How It Works */}
      <section className="py-20 px-10 text-center">
        <h2 className="text-4xl font-semibold mb-8">🚀 How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            "Sign Up",
            "Upload Assets",
            "Sell & Monetize",
            "Hire Cinematographers",
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800 text-white border-none">
                <h3 className="text-2xl font-semibold">{step}</h3>
                <p className="text-gray-400 mt-2">Step {index + 1}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-10 bg-black text-center">
        <h2 className="text-4xl font-semibold">
          Start Showcasing Your Work Today!
        </h2>
        <div className="mt-6">
          <Button type="primary" size="large" className="mr-4">
            Sign Up as a Creator
          </Button>
          <Button size="large" ghost>
            Browse Collections
          </Button>
        </div>
      </section>
    </div>
  );
}
