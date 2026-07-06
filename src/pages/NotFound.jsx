import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="empty-page container"><span>404</span><h1>Page not found</h1><Link className="button button-primary" to="/">Back to overview</Link></section>
}
