import { FaRocket, FaGlobe } from "react-icons/fa";
import FeatureCard from "../../shared/FeatureCard";


export default function OurMission() {
  return (
 

      <section className="py-16 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold neon-glow">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <FeatureCard icon={FaGlobe} title="Global Creative Hub" text="We aim to connect filmmakers and cinematographers from all around the world in one unified platform." />
          <FeatureCard icon={FaRocket} title="Empowering Artists" text="Our vision is to help content creators monetize their skills while providing access to premium cinematic assets." />
        </div>
      </section>

   );
}


