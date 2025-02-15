import FeatureCard from "../../shared/FeatureCard";
import { FaFilm, FaUsers, FaStar, FaHandshake } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
 
 <section className="py-16 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold neon-glow">Why Choose CineVerse?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
          <FeatureCard icon={FaFilm} title="Cinematic Collections" text="Explore high-quality LUTs, templates, and stock footage from top creators." />
          <FeatureCard icon={FaUsers} title="Talented Cinematographers" text="Discover and hire skilled professionals for your film projects." />
          <FeatureCard icon={FaStar} title="Premium & Free Content" text="Access free assets or buy exclusive premium collections." />
          <FeatureCard icon={FaHandshake} title="Seamless Collaboration" text="Work with professionals and bring your creative vision to life." />
        </div>
      </section>

   );
}


