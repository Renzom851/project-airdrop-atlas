import { useMemo, useState } from 'react'
import { Activity, AlertCircle, ArrowLeft, BookOpen, Check, Eraser, ExternalLink, LockKeyhole, PlugZap, RotateCcw, Settings2, Target, Trophy, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import Disclaimer from '../components/Disclaimer'
import { epochIds, estimateTier, formatNumber, getEpochs, S2_ASSUMED_POOL, S2_EPOCH_COUNT, tierBands } from '../data/grass'

const emptyRows = () => Object.fromEntries(epochIds.map((id) => [id, { points: '' }]))
const isSolanaAddress = (value) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value.trim())
const shorthandMultipliers = { k: 1_000, m: 1_000_000, b: 1_000_000_000 }

function parseShorthandNumber(value) {
  const compact = String(value).trim().replace(/[,\s_]/g, '')
  if (!compact) return 0

  const match = compact.match(/^(\d+(?:\.\d*)?|\.\d+)([kmb])?$/i)
  if (!match) return null

  const numeric = Number(match[1])
  if (!Number.isFinite(numeric)) return null

  const suffix = match[2]?.toLowerCase()
  return numeric * (suffix ? shorthandMultipliers[suffix] : 1)
}

function normalizeShorthandNumber(value) {
  const raw = String(value)
  if (!raw.trim()) return ''
  if (!/[kmb]\s*$/i.test(raw)) return raw

  const numeric = parseShorthandNumber(raw)
  if (numeric === null) return raw

  const rounded = Math.round((numeric + Number.EPSILON) * 100) / 100
  return String(rounded)
}

export default function GrassChecker() {
  const [wallet, setWallet] = useState('')
  const [walletTouched, setWalletTouched] = useState(false)
  const [walletError, setWalletError] = useState('')
  const [rows, setRows] = useState(emptyRows)
  const [connecting, setConnecting] = useState(false)
  const [assumedPoolInput, setAssumedPoolInput] = useState(String(S2_ASSUMED_POOL))

  const assumedPool = Math.max(0, Number(assumedPoolInput) || 0)
  const modeledEpochs = useMemo(() => getEpochs(assumedPool), [assumedPool])

  const results = useMemo(() => modeledEpochs.map((epoch) => {
    const row = rows[epoch.id]
    const points = parseShorthandNumber(row.points) ?? 0
    const tier = estimateTier(points)
    const payout = points >= 500 && tier ? epoch.rewards[tier - 1] : 0
    return { ...epoch, points, tier, payout }
  }), [modeledEpochs, rows])

  const total = results.reduce((sum, result) => sum + result.payout, 0)
  const totalPoints = results.reduce((sum, result) => sum + result.points, 0)
  const eligibleEpochs = results.filter((result) => result.payout > 0).length
  const averagePoints = eligibleEpochs ? totalPoints / eligibleEpochs : 0
  const bestEpoch = results.reduce((best, result) => (result.payout > best.payout ? result : best), { payout: 0, label: '—' })

  function updateRow(id, value) {
    const nextValue = normalizeShorthandNumber(value)
    if (nextValue.trim().startsWith('-')) return
    setRows((current) => ({ ...current, [id]: { points: nextValue } }))
  }

  function updateAssumedPool(value) {
    if (Number(value) < 0) return
    setAssumedPoolInput(value)
  }

  function resetAssumedPool() {
    setAssumedPoolInput(String(S2_ASSUMED_POOL))
  }

  async function connectWallet() {
    setConnecting(true)
    setWalletError('')
    try {
      if (!window.solana?.isPhantom && !window.solana?.connect) {
        setWalletError('No compatible Solana wallet was detected. Paste your public address instead.')
        return
      }
      const response = await window.solana.connect()
      const address = response.publicKey?.toString() || window.solana.publicKey?.toString()
      if (address) {
        setWallet(address)
        setWalletTouched(true)
      }
    } catch (error) {
      setWalletError(error?.message?.includes('rejected') ? 'Wallet connection was cancelled.' : 'Unable to connect. You can paste your public address instead.')
    } finally {
      setConnecting(false)
    }
  }

  function loadExample() {
    const sample = [
      12400, 18350, 22100, 30750, 41200,
      58400, 62250, 73500, 80900, 94200,
      118250, 132900, 146300, 173500, 201100,
      226000, 248400, 276800, 315500, 356900,
    ]
    setRows(Object.fromEntries(epochIds.map((id, index) => [id, { points: String(sample[index]) }])))
  }

  function reset() {
    setRows(emptyRows())
  }

  const walletValid = !wallet || isSolanaAddress(wallet)

  return (
    <section className="checker-page grass-theme">
      <div className="container checker-head">
        <Link to="/airdrops" className="back-link"><ArrowLeft size={16} /> All airdrops</Link>
        <div className="checker-title-row">
          <div className="project-icon grass-icon large" aria-hidden="true">
            <img src="/grass-logo.png" alt="" className="grass-logo-img" />
          </div>
          <div><div className="project-meta"><span>Grass</span><span>•</span><span>S2 allocation projection</span></div><h1>S2 allocation checker</h1></div>
        </div>
        <p>Estimate a Season 2-style GRASS allocation from 20 uptime epochs using automatic S1-style tiers and a projected payout curve.</p>
      </div>

      <div className="container"><Disclaimer /></div>

      <div className="container checker-layout">
        <div className="checker-main">
          <section className="panel wallet-panel">
            <div className="panel-heading">
              <div><span className="step-number">1</span><div><h2>Label your analysis</h2><p>Optional — your public address only labels this result.</p></div></div>
              <span className="privacy-label"><LockKeyhole size={14} /> Local only</span>
            </div>
            <div className="wallet-controls">
              <div className={`address-field ${walletTouched && !walletValid ? 'invalid' : ''}`}>
                <Wallet size={19} />
                <input
                  value={wallet}
                  onChange={(event) => { setWallet(event.target.value); setWalletTouched(true); setWalletError('') }}
                  onBlur={() => setWalletTouched(true)}
                  placeholder="Paste a Solana wallet address"
                  aria-label="Solana wallet address"
                />
                {wallet && walletValid && <Check className="valid-check" size={18} />}
              </div>
              <span className="or-divider">or</span>
              <button className="button button-dark connect-button" onClick={connectWallet} disabled={connecting}>
                <PlugZap size={17} /> {connecting ? 'Connecting…' : 'Connect wallet'}
              </button>
            </div>
            {(walletError || (walletTouched && !walletValid)) && <p className="field-error"><AlertCircle size={15} /> {walletError || 'Enter a valid public Solana address.'}</p>}
            <p className="field-help">Connecting only requests your public address. This site never requests a signature, transaction, seed phrase, or private key.</p>
          </section>

          <section className="panel uptime-help-panel">
            <div className="panel-heading">
              <div><span className="step-number">2</span><div><h2>Find your uptime points</h2><p>Use the S2 Uptime Points value from the Grass rewards dashboard.</p></div></div>
              <BookOpen size={18} className="panel-accent-icon" />
            </div>
            <div className="uptime-guide-grid">
              <div>
                <span>01</span>
                <strong>Open the dashboard</strong>
                <p>Go to the Grass dashboard and open the rewards or points area for your account.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Check epoch history</strong>
                <p>Select Season 2 / Stage 2 and copy the Uptime Points shown for each numbered epoch.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Enter only uptime</strong>
                <p>Use Uptime Points for Epoch 1–20. This model ignores Network Points and referral commissions.</p>
              </div>
            </div>
            <a className="dashboard-link" href="https://app.grass.io/" target="_blank" rel="noreferrer">Open Grass dashboard <ExternalLink size={14} /></a>
          </section>

          <section className="panel points-panel">
            <div className="panel-heading points-heading">
              <div><span className="step-number">3</span><div><h2>Enter S2 uptime points</h2><p>Auto tier is calculated from your points. Season 2 uses 20 numbered epochs.</p></div></div>
              <div className="table-actions"><button onClick={loadExample}>Load example</button><button onClick={reset}><Eraser size={14} /> Clear</button></div>
            </div>

            <div className="points-table s2-points-table" role="table" aria-label="Grass Season 2 allocation estimate">
              <div className="points-row points-header" role="row">
                <span>Epoch</span><span>Uptime points</span><span>Auto tier</span><span>Est. GRASS</span>
              </div>
              {results.map((result) => {
                const row = rows[result.id]
                return (
                  <div className="points-row" role="row" key={result.id}>
                    <div className="epoch-name"><strong>{result.label}</strong><span>{formatNumber(result.allocation, 0)} assumed pool</span></div>
                    <div className="number-input"><input type="text" inputMode="decimal" value={row.points} onChange={(event) => updateRow(result.id, event.target.value)} placeholder="0" /><span>UP</span></div>
                    <strong className={result.tier ? 'tier-value has-value' : 'tier-value'}>{result.tier ? `Tier ${result.tier}` : '—'}</strong>
                    <strong className={result.payout ? 'token-value has-value' : 'token-value'}>{result.payout ? formatNumber(result.payout) : '—'}</strong>
                  </div>
                )
              })}
            </div>
            <div className="threshold-note"><AlertCircle size={16} /><p>This is an S1-style projection: 500 uptime points is treated as the minimum eligible epoch, tiers are assigned automatically from S1-like point bands, and a {formatNumber(assumedPool, 0)} GRASS network pool is redistributed across 20 equal S2 epochs.</p></div>
          </section>

          <section className="panel settings-panel">
            <div className="panel-heading settings-heading">
              <div><span className="step-number">4</span><div><h2>Model settings</h2><p>Adjust the projected pool used to scale every estimated payout.</p></div></div>
              <Settings2 size={18} className="panel-accent-icon" />
            </div>
            <div className="settings-grid">
              <label className="setting-field">
                <span>Assumed S2 network pool</span>
                <div className="pool-input">
                  <input
                    type="number"
                    min="0"
                    step="1000000"
                    inputMode="decimal"
                    value={assumedPoolInput}
                    onChange={(event) => updateAssumedPool(event.target.value)}
                    aria-describedby="pool-setting-help"
                  />
                  <strong>GRASS</strong>
                </div>
              </label>
              <button className="button button-secondary setting-reset" onClick={resetAssumedPool}>
                <RotateCcw size={15} /> Reset 90M
              </button>
            </div>
            <p id="pool-setting-help" className="settings-help">Current model pool: {formatNumber(assumedPool, 0)} GRASS. Tier thresholds stay the same; only projected token payouts scale.</p>
          </section>

          <section className="panel model-panel">
            <div className="panel-heading"><div><span className="step-number">5</span><div><h2>How the S2 estimate is calculated</h2><p>Automatic tiers only, using a projected payout curve based on the S1 model.</p></div></div></div>
            <div className="formula"><span>Epoch 1–20 uptime points</span><b>→</b><span>Auto S1-style tier</span><b>→</b><span>Projected S2 GRASS payout</span></div>
            <div className="rank-summary">
              <div><Activity size={17} /><span>Assumed pool</span><strong>{formatNumber(assumedPool, 0)} GRASS</strong></div>
              <div><Trophy size={17} /><span>Eligible epochs</span><strong>{eligibleEpochs} / {S2_EPOCH_COUNT}</strong></div>
              <div><Target size={17} /><span>Tier range</span><strong>{tierBands.at(-1).label} minimum</strong></div>
            </div>
            <Link to="/docs#grass-model" className="text-link">Read full methodology <ArrowLeft className="rotate-icon" size={16} /></Link>
          </section>
        </div>

        <aside className="result-card grass-result-card">
          <div className="overview-brand">
            <div className="grass-wordmark" aria-label="Grass">
              <span className="grass-wordmark-mark" aria-hidden="true">
                <img src="/grass-logo.png" alt="" className="grass-logo-img" />
              </span>
              <strong>Grass</strong>
            </div>
            <span className="result-label">Estimated S2 allocation</span>
          </div>
          <div className="result-total"><strong>{formatNumber(total)}</strong><span>GRASS</span></div>
          <div className="estimate-tag"><span /> S1-style projection</div>
          <div className="rank-badge"><Trophy size={17} /><div><span>Best epoch</span><strong>{bestEpoch.payout ? bestEpoch.label : '—'}</strong></div></div>
          <div className="result-divider" />
          <div className="result-stats">
            <div><span>Eligible epochs</span><strong>{eligibleEpochs} / {S2_EPOCH_COUNT}</strong></div>
            <div><span>Total uptime entered</span><strong>{formatNumber(totalPoints, 0)} UP</strong></div>
            <div><span>Avg. eligible epoch</span><strong>{formatNumber(averagePoints, 0)} UP</strong></div>
            <div><span>Assumed S2 pool</span><strong>{formatNumber(assumedPool, 0)} GRASS</strong></div>
            <div><span>Auto tiering</span><strong>S1-style</strong></div>
            <div><span>Wallet</span><strong>{walletValid && wallet ? `${wallet.slice(0, 4)}…${wallet.slice(-4)}` : 'Not added'}</strong></div>
          </div>
          <div className="result-divider" />
          <p className="result-copy">This is a projected allocation, not an official Grass claim. It assumes S2 follows an S1-like tier payout structure across 20 epochs.</p>
          <Link to="/docs#limitations" className="result-link">Understand the limitations</Link>
        </aside>
      </div>
    </section>
  )
}
