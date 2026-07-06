import { BookOpen, Calculator, CheckCircle2, FileText, ListChecks, LockKeyhole, ShieldAlert, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Docs() {
  return (
    <section className="docs-page container">
      <aside className="docs-nav">
        <span>Documentation</span>
        <a href="#overview">Airdrop Atlas</a>
        <a href="#what-it-does">What it does</a>
        <a href="#how-checkers-work">How checkers work</a>
        <a href="#grass-model">Grass checker</a>
        <a href="#privacy">Privacy</a>
        <a href="#limitations">Limitations</a>
        <a href="#sources">Sources</a>
      </aside>
      <article className="docs-content">
        <div className="docs-hero" id="overview">
          <span className="kicker">Airdrop Atlas docs</span>
          <h1>What this website is for.</h1>
          <p>Airdrop Atlas is a browser-based hub for airdrop allocation checkers. It helps users turn public project activity, points, epochs, ranks, or other documented inputs into transparent educational estimates.</p>
        </div>

        <div className="docs-callout"><BookOpen size={20} /><p><strong>Plain-language summary:</strong> the website does not claim tokens, log in to airdrop accounts, or promise official eligibility. It gives users a clean place to enter known values, see the math, adjust assumptions, and understand the limits of each model.</p></div>

        <section id="what-it-does" className="docs-section">
          <div className="docs-icon"><Target size={20} /></div>
          <h2>What Airdrop Atlas does</h2>
          <p>The site organizes independent airdrop calculators in one place. Each checker is built around a specific project and shows the input fields, assumptions, estimated output, and limitations directly on the page.</p>
          <div className="docs-feature-grid">
            <div>
              <CheckCircle2 size={18} />
              <strong>Estimate allocations</strong>
              <span>Convert user-entered point or activity data into a projected token amount when a model is available.</span>
            </div>
            <div>
              <CheckCircle2 size={18} />
              <strong>Show the assumptions</strong>
              <span>Keep formulas, tier rules, default pools, and warnings visible instead of hiding the calculation.</span>
            </div>
            <div>
              <CheckCircle2 size={18} />
              <strong>Keep inputs local</strong>
              <span>Run calculations in the browser so users can test scenarios without submitting point history to a server.</span>
            </div>
          </div>
          <p>Airdrop Atlas is useful for planning, comparison, and learning how an allocation model might work. It is not a replacement for official project dashboards or claim pages.</p>
        </section>

        <section id="how-checkers-work" className="docs-section">
          <div className="docs-icon"><ListChecks size={20} /></div>
          <h2>How the checkers work</h2>
          <ol>
            <li>A supported project gets a dedicated checker page with the fields that matter for that project.</li>
            <li>The user enters public values from the project dashboard, such as points, epochs, ranks, or activity totals.</li>
            <li>The checker applies a disclosed formula or projection model and updates the result immediately.</li>
            <li>The page shows the estimated allocation, model settings, data sources, and limitations so users can judge the result.</li>
          </ol>
          <div className="code-formula">User inputs + documented assumptions = educational estimate</div>
          <div className="docs-flow-grid">
            <div><span>01</span><strong>Choose a project</strong><p>Start from the airdrop directory and open a live checker.</p></div>
            <div><span>02</span><strong>Enter known values</strong><p>Paste the values shown in the project dashboard or activity history.</p></div>
            <div><span>03</span><strong>Review the model</strong><p>Check the output, editable assumptions, source notes, and warnings.</p></div>
          </div>
        </section>

        <section id="grass-model" className="docs-section">
          <div className="docs-icon"><Calculator size={20} /></div>
          <h2>Current live checker: Grass</h2>
          <p>The first supported model is the Grass Season 2 allocation checker. It estimates a Season 2-style GRASS allocation from Uptime Points by applying a Season 1-style tier and payout projection across 20 epochs.</p>
          <div className="docs-checker-card">
            <div>
              <span className="status-pill">Live checker</span>
              <h3>Grass S2 allocation checker</h3>
              <p>Users enter Uptime Points for Epoch 1 through Epoch 20. The checker assigns an automatic tier, estimates the projected GRASS payout per epoch, and adds the total.</p>
            </div>
            <Link to="/airdrops/grass" className="button button-primary">Open checker</Link>
          </div>
          <h3>Grass model summary</h3>
          <p>Grass Stage 2 separates points into Uptime Points and Network Points. This checker uses Uptime Points only. It defaults to a 90M GRASS assumed S2 network pool and lets users adjust that pool in the model settings.</p>
          <div className="code-formula">Estimated Grass S2 allocation = sum of projected payout(auto tier, Epoch 1 to Epoch 20)</div>
          <p>The Grass checker is a projection, not an official claim result. Airdrop Atlas can add more project checkers later when their source data and model assumptions can be documented clearly.</p>
        </section>

        <section id="privacy" className="docs-section">
          <div className="docs-icon"><LockKeyhole size={20} /></div>
          <h2>Privacy and wallet safety</h2>
          <p>Airdrop Atlas is designed around local calculations. Point entries and model changes happen in the browser. A wallet address, when a checker offers one, is optional and only labels the on-screen result unless the page clearly says otherwise.</p>
          <ul>
            <li>No token approvals, transactions, or message signatures are requested.</li>
            <li>No private key, recovery phrase, password, or account login is needed.</li>
            <li>The current checker does not require a backend account or project login.</li>
            <li>The website cannot claim tokens or complete official eligibility checks.</li>
          </ul>
        </section>

        <section id="limitations" className="docs-section">
          <div className="docs-icon warning"><ShieldAlert size={20} /></div>
          <h2>What the website does not do</h2>
          <p>Results are hypothetical and should not be used as financial advice, evidence of eligibility, or a confirmed valuation. Airdrop Atlas does not verify wallet ownership, anti-Sybil status, jurisdiction, snapshot inclusion, linked-account deadlines, official tier assignment, or future program rules.</p>
          <p>Every checker depends on the assumptions shown on its page. If an official project changes its rules, pools, point systems, or claim requirements, the estimate can become outdated.</p>
        </section>

        <section id="sources" className="docs-section sources-section">
          <div className="docs-icon"><FileText size={20} /></div>
          <h2>Current project sources</h2>
          <p>Sources are tracked per checker. For the current Grass checker, these are the references used to explain the point categories and historical payout model.</p>
          <a href="https://grass-foundation.gitbook.io/grass-docs/how-to-guide/grass-points" target="_blank" rel="noreferrer"><span>Grass Foundation — Grass Points</span><small>Uptime Points, Network Points, rank cutoffs, referrals, and epoch history</small></a>
          <a href="https://grass-foundation.gitbook.io/grass-docs/introduction/grass/grass-airdrop-one" target="_blank" rel="noreferrer"><span>Grass Foundation — Grass Airdrop One</span><small>Season 1 Network Snapshot pool and historical tier payout table</small></a>
          <a href="https://www.grass.io/learn/an-update-to-the-grass-points-model" target="_blank" rel="noreferrer"><span>Grass — Points Model Update</span><small>Uptime and Network Points explanation plus rewards dashboard notes</small></a>
          <p className="source-date">Source methodology reviewed July 5, 2026.</p>
        </section>
      </article>
    </section>
  )
}
