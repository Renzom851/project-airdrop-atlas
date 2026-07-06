import { BookOpen, Calculator, LockKeyhole, ShieldAlert } from 'lucide-react'

export default function Docs() {
  return (
    <section className="docs-page container">
      <aside className="docs-nav">
        <span>Documentation</span>
        <a href="#overview">Overview</a>
        <a href="#grass-model">Grass model</a>
        <a href="#wallets">Wallet safety</a>
        <a href="#limitations">Limitations</a>
        <a href="#sources">Sources</a>
      </aside>
      <article className="docs-content">
        <div className="docs-hero" id="overview">
          <span className="kicker">Documentation</span>
          <h1>Independent analysis,<br />without false precision.</h1>
          <p>Airdrop Atlas provides educational estimates from user-supplied inputs and documented historical data. It does not check official eligibility or query private account data.</p>
        </div>

        <div className="docs-callout"><BookOpen size={20} /><p><strong>Plain-language summary:</strong> the Grass checker estimates a Season 2-style allocation from Uptime Points by applying a Season 1-style tier and payout model across 20 epochs. It is a projection, not an official claim result.</p></div>

        <section id="grass-model" className="docs-section">
          <div className="docs-icon"><Calculator size={20} /></div>
          <h2>Grass Season 2 allocation projection</h2>
          <p>Grass Stage 2 separates points into Uptime Points and Network Points. This checker uses Uptime Points as the input and projects a GRASS allocation with a Season 1-style calculation.</p>
          <p>Season 2 is modeled as 20 numbered epochs: Epoch 1 through Epoch 20. Closed Alpha, Bonus Epoch, and other Season 1 labels are not included as separate rows.</p>
          <h3>Calculation</h3>
          <ol>
            <li>For each S2 epoch, the user enters their Uptime Points from the Grass dashboard.</li>
            <li>Each epoch is automatically assigned a tier using the same point bands used by the site’s Season 1 model.</li>
            <li>The historical Season 1 Network Snapshot payout curve is normalized into 20 equal S2 epochs.</li>
            <li>The selected tier payout for each epoch is added into the estimated total GRASS allocation.</li>
          </ol>
          <div className="code-formula">Estimated S2 allocation = Σ projected payout(auto tier, Epoch 1 … Epoch 20)</div>
          <h3>Model assumption</h3>
          <p>The projection defaults to a 90M GRASS S2 network pool and redistributes the Season 1 Network Snapshot payout curve across 20 equal S2 epochs. The checker settings let users adjust that assumed pool. Grass has not published a final Season 2 token conversion formula for this calculator to verify.</p>
        </section>

        <section id="wallets" className="docs-section">
          <div className="docs-icon"><LockKeyhole size={20} /></div>
          <h2>Wallet use and safety</h2>
          <p>A wallet address is optional and does not affect the calculation. Pasting or connecting a wallet only labels the on-screen analysis. The app runs in the browser and does not submit point entries to a backend.</p>
          <ul>
            <li>No token approvals, transactions, or message signatures are requested.</li>
            <li>No private key, recovery phrase, password, or account login is needed.</li>
            <li>This website cannot claim tokens and is not a Grass Foundation property.</li>
          </ul>
        </section>

        <section id="limitations" className="docs-section">
          <div className="docs-icon warning"><ShieldAlert size={20} /></div>
          <h2>Important limitations</h2>
          <p>Results are hypothetical and should not be used as financial advice, evidence of eligibility, or a valuation. Wallet ownership, anti-Sybil filtering, jurisdiction, snapshots, linked-account deadlines, official tier assignment, and future program rules are not verified.</p>
          <p>Future Grass stages can use different pools, eligibility rules, or point systems. This S1-style Season 2 projection should not be treated as a confirmed token allocation.</p>
        </section>

        <section id="sources" className="docs-section sources-section">
          <h2>Primary sources</h2>
          <a href="https://grass-foundation.gitbook.io/grass-docs/how-to-guide/grass-points" target="_blank" rel="noreferrer"><span>Grass Foundation — Grass Points</span><small>Uptime Points, Network Points, rank cutoffs, referrals, and epoch history</small></a>
          <a href="https://grass-foundation.gitbook.io/grass-docs/introduction/grass/grass-airdrop-one" target="_blank" rel="noreferrer"><span>Grass Foundation — Grass Airdrop One</span><small>Season 1 Network Snapshot pool and historical tier payout table</small></a>
          <a href="https://www.grass.io/learn/an-update-to-the-grass-points-model" target="_blank" rel="noreferrer"><span>Grass — Points Model Update</span><small>Uptime and Network Points explanation plus rewards dashboard notes</small></a>
          <p className="source-date">Source methodology reviewed July 5, 2026.</p>
        </section>
      </article>
    </section>
  )
}
