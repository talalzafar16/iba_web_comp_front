
import AboutHeroSection from "../../components/widgets/About/HeroSection";
import WhyChooseUs from "../../components/widgets/About/WhyChooseUs";
import OurMission from "../../components/widgets/About/OurMission";
import OurJourney from "../../components/widgets/About/OurJourney";
import OurTeam from "../../components/widgets/About/OurTeam";
import OurTestimonials from "../../components/widgets/About/OurTestimonials";
import JoinCommunity from "../../components/widgets/About/JoinCommunity";

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen">
     <AboutHeroSection/>

    <OurMission/>

    <WhyChooseUs/>

    <OurJourney/>

 <OurTeam/>
     <OurTestimonials/>
<JoinCommunity/>
 
    </div>
  );
}


