import TestimonialCard from '../../shared/TestimonialCard'

const OurTestimonials = () => {
  return (
    <div className="bg-gray-900">
    <section className="py-16 px-8 max-w-7xl mx-auto text-center ">
      <h2 className="text-4xl font-semibold neon-glow">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <TestimonialCard name="Emily R." text="CineVerse transformed my film projects! The collections are amazing, and the hiring feature is seamless." />
        <TestimonialCard name="Daniel M." text="Being a cinematographer, CineVerse helped me find new clients and showcase my work to a global audience." />
      </div>
    </section>
      </div> 
  )
}

export default OurTestimonials