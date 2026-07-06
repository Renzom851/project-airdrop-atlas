import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import Brand from './Brand'

const links = [
  ['/', 'Overview'],
  ['/airdrops', 'Airdrops'],
  ['/docs', 'Docs'],
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const savedTheme = window.localStorage.getItem('theme')
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-wrap container">
          <Brand />
          <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
            ))}
            <NavLink to="/airdrops" className="nav-cta" onClick={() => setOpen(false)}>Browse checkers</NavLink>
          </nav>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Brand footer />
            <p>Independent allocation models for research and education.</p>
          </div>
          <div className="footer-links">
            <NavLink to="/airdrops">Airdrops</NavLink>
            <NavLink to="/docs">Methodology</NavLink>
            <a href="https://grass-foundation.gitbook.io/grass-docs/how-to-guide/grass-points" target="_blank" rel="noreferrer">Source docs</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Airdrop Atlas</span>
          <span>Not affiliated with listed projects or foundations.</span>
        </div>
      </footer>
    </div>
  )
}
