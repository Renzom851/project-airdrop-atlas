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
      <p>Enter your Grass uptime points and see a possible Season 2 GRASS allocation.</p>
      <div className="project-stats">
        <div><span>Estimate</span><strong>Season 2 style</strong></div>
        <div><span>You enter</span><strong>20 epochs</strong></div>
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
      <p>The directory is built for multiple airdrops, so new project checkers can be added beside Grass.</p>
      <div className="project-stats">
        <div><span>Status</span><strong>Next checkers</strong></div>
        <div><span>Coverage</span><strong>Expanding</strong></div>
      </div>
      <Link to="/airdrops" className="text-link">View checker directory <ArrowUpRight size={17} /></Link>
    </article>
  )
}
