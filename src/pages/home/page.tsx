import { Button, Card, Carousel } from "antd";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { PlayCircleOutlined, FireOutlined } from "@ant-design/icons";

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        >
          <source src="/cinematic-bg.mp4" type="video/mp4" />
        </video>

        <div
          ref={heroRef}
          className="relative flex flex-col items-center justify-center h-full text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-5xl font-bold"
          >
            Discover. Create. Monetize Your Cinematic Vision.
          </motion.h1>
          <p className="text-lg text-gray-300 mt-4">
            A home for filmmakers, cinematographers, and content creators.
          </p>

          <div className="mt-6 flex space-x-4">
            <Button type="primary" shape="round" size="large" icon={<FireOutlined />}>
              Explore Collections
            </Button>
            <Button shape="round" size="large" ghost icon={<PlayCircleOutlined />}>
              Join as a Creator
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Collections */}
      <section className="py-20 px-10">
        <h2 className="text-4xl font-semibold text-center mb-8">🔥 Trending Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                cover={<img src={`/sample-${item}.jpg`} alt="Collection" className="rounded-lg" />}
                className="bg-gray-800 text-white border-none"
              >
                <h3 className="text-xl font-semibold">Cinematic Collection {item}</h3>
                <p className="text-gray-400">By Top Creators</p>
                <Button type="link">View Details</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Cinematographers */}
      <section className="py-20 px-10 bg-gray-900">
        <h2 className="text-4xl font-semibold text-center mb-8">🎥 Featured Cinematographers</h2>
        <Carousel autoplay className="max-w-3xl mx-auto">
          {[1, 2, 3].map((cinematographer) => (
            <div key={cinematographer} className="p-6">
              <Card className="bg-gray-800 text-white text-center border-none">
                <img
                  src={`/cinematographer-${cinematographer}.jpg`}
                  alt="Cinematographer"
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h3 className="text-xl mt-4 font-semibold">John Doe</h3>
                <p className="text-gray-400">Award-winning Cinematographer</p>
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
          {["Sign Up", "Upload Assets", "Sell & Monetize", "Hire Cinematographers"].map(
            (step, index) => (
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
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-10 bg-black text-center">
        <h2 className="text-4xl font-semibold">Start Showcasing Your Work Today!</h2>
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
