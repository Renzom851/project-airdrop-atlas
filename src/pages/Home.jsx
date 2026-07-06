import { ArrowRight, BarChart3, Database, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Disclaimer from '../components/Disclaimer'
import ProjectCard, { UpcomingProjectCard } from '../components/ProjectCard'

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="eyebrow"><span /> Independent airdrop research</div>
        <h1>One hub for<br /><em>airdrop estimates.</em></h1>
        <p className="hero-copy">Transparent allocation models for supported airdrop projects. Start with the live Grass checker today, then add new project calculators as their point systems and sources are documented.</p>
        <div className="hero-actions">
          <Link to="/airdrops" className="button button-primary">Browse airdrop checkers <ArrowRight size={18} /></Link>
          <Link to="/airdrops/grass" className="button button-secondary">Open Grass checker</Link>
        </div>
        <Disclaimer compact />
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          <div><Database size={21} /><strong>Project inputs</strong><span>Each checker uses its own documented fields</span></div>
          <div><BarChart3 size={21} /><strong>Clear calculation</strong><span>Assumptions, tiers, and estimates stay visible</span></div>
          <div><ShieldCheck size={21} /><strong>Privacy first</strong><span>Calculations stay in your browser</span></div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading split-heading">
          <div><span className="kicker">Checker directory</span><h2>Live now, built to expand</h2></div>
          <Link to="/airdrops" className="text-link">View all models <ArrowRight size={17} /></Link>
        </div>
        <div className="cards-showcase">
          <ProjectCard />
          <UpcomingProjectCard />
        </div>
      </section>

      <section className="how-section container">
        <div className="section-heading"><span className="kicker">How it works</span><h2>From project data to an estimate</h2><p>No account, backend, or wallet transaction required.</p></div>
        <div className="steps-grid">
          <div className="step"><span>01</span><h3>Choose a project</h3><p>Pick a live checker from the directory. Grass is the first supported model.</p></div>
          <div className="step"><span>02</span><h3>Add project inputs</h3><p>Enter the points, epochs, ranks, or other public activity fields that the selected model needs.</p></div>
          <div className="step"><span>03</span><h3>Review assumptions</h3><p>Inspect the calculation, editable settings, projected output, and limitations before relying on the estimate.</p></div>
        </div>
      </section>
    </>
  )
}
