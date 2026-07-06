import { Link } from 'react-router-dom'

export default function Brand({ footer = false }) {
  return (
    <Link to="/" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="Airdrop Atlas home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M7 22.7c4.3-1.5 7-4.8 8.2-10.1 3.7 2.8 6.3 6.6 7.8 11.4" />
          <path d="M10.3 25.1c2.4-2.7 4.9-4.5 7.5-5.2" />
          <circle cx="8" cy="10" r="2.2" />
          <circle cx="23.8" cy="8" r="1.5" />
        </svg>
      </span>
      <span>Airdrop Atlas</span>
    </Link>
  )
}
