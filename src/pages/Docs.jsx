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
          <span className="kicker">Airdrop Atlas guide</span>
          <h1>Estimate your airdrops with less guesswork.</h1>
          <p>Airdrop Atlas is a simple place to check what your airdrop points may turn into. Pick a project, paste the numbers from its dashboard, and see a clear estimate with the important warnings beside it.</p>
        </div>

        <div className="docs-callout"><BookOpen size={20} /><p><strong>Quick summary:</strong> use this as a planning tool. It can help you estimate, compare, and understand a possible allocation. It does not claim tokens for you, log in to your airdrop account, or guarantee that you are eligible.</p></div>

        <section id="what-it-does" className="docs-section">
          <div className="docs-icon"><Target size={20} /></div>
          <h2>What you can do here</h2>
          <p>Instead of guessing from screenshots or spreadsheets, you can use a checker made for the project you care about. Each checker asks for the values you can find in that project’s dashboard and turns them into an easy-to-read estimate.</p>
          <div className="docs-feature-grid">
            <div>
              <CheckCircle2 size={18} />
              <strong>Check your points</strong>
              <span>Paste the points, ranks, epochs, or activity numbers shown in a supported project dashboard.</span>
            </div>
            <div>
              <CheckCircle2 size={18} />
              <strong>See an estimate</strong>
              <span>Get a projected token amount and see which entries helped your total the most.</span>
            </div>
            <div>
              <CheckCircle2 size={18} />
              <strong>Stay in control</strong>
              <span>Review the settings and warnings before you decide how much weight to give the result.</span>
            </div>
          </div>
          <p>Airdrop Atlas is useful for planning and comparison before official claim details are final. It is not a replacement for the project’s official dashboard, claim page, or announcements.</p>
        </section>

        <section id="how-checkers-work" className="docs-section">
          <div className="docs-icon"><ListChecks size={20} /></div>
          <h2>How the checkers work</h2>
          <ol>
            <li>Open the checker for the project you want to estimate.</li>
            <li>Copy the values from that project’s dashboard, such as points, epochs, ranks, or activity totals.</li>
            <li>Paste those values into the checker and the estimate updates right away.</li>
            <li>Read the settings, sources, and warnings before relying on the number.</li>
          </ol>
          <div className="code-formula">Your dashboard values &gt; projected estimate &gt; warnings to review</div>
          <div className="docs-flow-grid">
            <div><span>01</span><strong>Choose a project</strong><p>Start from the airdrop directory and open a live checker.</p></div>
            <div><span>02</span><strong>Paste your values</strong><p>Use the numbers shown in the project dashboard or activity history.</p></div>
            <div><span>03</span><strong>Review the result</strong><p>Check the estimate, settings, source notes, and warnings.</p></div>
          </div>
        </section>

        <section id="grass-model" className="docs-section">
          <div className="docs-icon"><Calculator size={20} /></div>
          <h2>Current live checker: Grass</h2>
          <p>The first live checker is for Grass Season 2. It lets you enter your Uptime Points for each epoch and gives you a projected GRASS total.</p>
          <div className="docs-checker-card">
            <div>
              <span className="status-pill">Live checker</span>
              <h3>Grass S2 allocation checker</h3>
              <p>Enter Uptime Points for Epoch 1 through Epoch 20. The checker estimates a tier for each epoch, calculates the projected GRASS amount, and adds everything into one total.</p>
            </div>
            <Link to="/airdrops/grass" className="button button-primary">Open checker</Link>
          </div>
          <h3>How the Grass estimate works</h3>
          <p>Grass Stage 2 shows different point types. This checker only uses Uptime Points. It starts with a 170M GRASS assumed S2 network pool, and you can change that number in the model settings.</p>
          <div className="code-formula">Estimated Grass S2 allocation = sum of projected payout(auto tier, Epoch 1 to Epoch 20)</div>
          <p>The Grass checker is a projection, not an official claim result. More project checkers can be added later when there is enough public information to make a useful estimate.</p>
        </section>

        <section id="privacy" className="docs-section">
          <div className="docs-icon"><LockKeyhole size={20} /></div>
          <h2>Privacy and wallet safety</h2>
          <p>Your point entries and setting changes are calculated in your browser. If a checker lets you paste or connect a wallet, that wallet is only used to label the on-screen result unless the page clearly says otherwise.</p>
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
