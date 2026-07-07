import { ArrowRight, BarChart3, Database, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Disclaimer from '../components/Disclaimer'
import ProjectCard, { UpcomingProjectCard } from '../components/ProjectCard'

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="eyebrow"><span /> Multi-project airdrop checkers</div>
        <h1>Check possible<br /><em>airdrop rewards.</em></h1>
        <p className="hero-copy">Use the points from supported project dashboards to estimate what your activity could be worth before official claim details are final. Compare available checkers, review the assumptions, and keep new projects in one place.</p>
        <div className="hero-actions">
          <Link to="/airdrops" className="button button-primary">Browse airdrop checkers <ArrowRight size={18} /></Link>
          <Link to="/airdrops/grass" className="button button-secondary">Open live Grass checker</Link>
        </div>
        <Disclaimer compact />
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          <div><Database size={21} /><strong>Project-specific inputs</strong><span>Use the points each project shows in its dashboard</span></div>
          <div><BarChart3 size={21} /><strong>Comparable estimates</strong><span>Review possible rewards, tiers, and warnings in one place</span></div>
          <div><ShieldCheck size={21} /><strong>Wallet-safe checks</strong><span>No transaction or claim signature is needed</span></div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading split-heading">
          <div><span className="kicker">Checker directory</span><h2>One place for project estimates</h2></div>
          <Link to="/airdrops" className="text-link">See all checkers <ArrowRight size={17} /></Link>
        </div>
        <div className="cards-showcase">
          <ProjectCard />
          <UpcomingProjectCard />
        </div>
      </section>

      <section className="how-section container">
        <div className="section-heading"><span className="kicker">How it works</span><h2>Check any supported project</h2><p>You can estimate possible allocations without creating an account or signing a wallet transaction.</p></div>
        <div className="steps-grid">
          <div className="step"><span>01</span><h3>Choose a project</h3><p>Open the checker for the airdrop you want to estimate.</p></div>
          <div className="step"><span>02</span><h3>Enter your activity</h3><p>Add the points, epochs, ranks, or activity numbers shown in that project's dashboard.</p></div>
          <div className="step"><span>03</span><h3>Review your estimate</h3><p>Compare the possible reward with the assumptions and warnings before you make any decisions.</p></div>
        </div>
      </section>
    </>
  )
}
