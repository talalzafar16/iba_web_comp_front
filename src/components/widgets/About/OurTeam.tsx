import TeamMember from "../../shared/TeamMember"


const OurTeam = () => {
  return (
        <section className="py-16 px-8 max-w-7xl mx-auto text-center">
           <h2 className="text-4xl font-semibold neon-glow">Meet Our Team</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
             <TeamMember name="Katrina kaif" role="Founder & CEO" img="/pic1.jpg" />
             <TeamMember name="Talha Anjum" role="Lead Cinematographer" img="/pic2.jpg" />
             <TeamMember name="Khan Sahaab" role="Head of Collections" img="/pic3.jpg" />
           </div>
         </section>
  )
}

export default OurTeam