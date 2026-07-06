import ProjectCard, { UpcomingProjectCard } from '../components/ProjectCard'

export default function Airdrops() {
  return (
    <section className="page-section container">
      <div className="page-heading">
        <span className="kicker">Airdrop directory</span>
        <h1>Airdrop checkers</h1>
        <p>Independent project-by-project calculators with documented assumptions and no claim functionality. Grass is live first; more checker projects can be added here as models are built.</p>
      </div>
      <div className="filter-row">
        <button className="filter active">All <span>1</span></button>
        <button className="filter">DePIN <span>1</span></button>
        <span className="model-count">1 live model · more planned</span>
      </div>
      <div className="project-grid"><ProjectCard /><UpcomingProjectCard /></div>
    </section>
  )
}
