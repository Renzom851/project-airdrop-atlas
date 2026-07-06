import { ArrowUpRight, CheckCircle2, Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectCard() {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <div className="project-icon grass-icon" aria-hidden="true">
          <img src="/grass-logo.png" alt="" className="grass-logo-img" />
        </div>
        <span className="status-pill"><CheckCircle2 size={14} /> Live</span>
      </div>
      <div className="project-meta"><span>DePIN</span><span>•</span><span>Solana</span></div>
      <h3>Grass</h3>
      <p>Estimate a Season 2-style GRASS allocation from your uptime points across 20 numbered epochs.</p>
      <div className="project-stats">
        <div><span>Model</span><strong>S1-style S2</strong></div>
        <div><span>Inputs</span><strong>20 epochs</strong></div>
      </div>
      <Link to="/airdrops/grass" className="text-link">Open Grass checker <ArrowUpRight size={17} /></Link>
    </article>
  )
}

export function UpcomingProjectCard() {
  return (
    <article className="project-card project-card-muted">
      <div className="project-card-top">
        <div className="project-icon planned-icon" aria-hidden="true">
          <Layers3 size={24} />
        </div>
        <span className="status-pill planned">More soon</span>
      </div>
      <div className="project-meta"><span>Multi-project</span><span>•</span><span>Planned</span></div>
      <h3>More airdrops</h3>
      <p>Future checker modules can sit beside Grass with their own inputs, assumptions, sources, and project-specific estimates.</p>
      <div className="project-stats">
        <div><span>Status</span><strong>Next models</strong></div>
        <div><span>Coverage</span><strong>Expanding</strong></div>
      </div>
      <Link to="/airdrops" className="text-link">View checker directory <ArrowUpRight size={17} /></Link>
    </article>
  )
}
