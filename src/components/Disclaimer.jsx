import { Info } from 'lucide-react'

export default function Disclaimer({ compact = false }) {
  return (
    <div className={compact ? 'notice notice-compact' : 'notice'}>
      <Info size={18} aria-hidden="true" />
      <p><strong>Analysis only.</strong> This is an independent estimate, not an official checker, claim page, or promise of tokens. Never enter a seed phrase or private key.</p>
    </div>
  )
}
