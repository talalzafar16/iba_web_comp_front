import TimelineEvent from '../../shared/TimelineEvent'

const OurJourney = () => {
  return (
      <section className="py-16 px-8 max-w-7xl mx-auto">
            <h2 className="text-4xl font-semibold neon-glow text-center">Our Journey</h2>
            <div className="mt-10 space-y-8">
              <TimelineEvent year="2020" title="CineVerse Concept" text="The idea of CineVerse was born to bridge the gap between filmmakers and cinematographers." />
              <TimelineEvent year="2022" title="Beta Launch" text="We launched a prototype with a small group of artists and received overwhelming feedback." />
              <TimelineEvent year="2023" title="Global Expansion" text="CineVerse expanded, introducing new features such as hiring, premium collections, and AI-powered recommendations." />
            </div>
          </section>
  )
}

export default OurJourney