import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Airdrops from './pages/Airdrops'
import GrassChecker from './pages/GrassChecker'
import Docs from './pages/Docs'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="airdrops" element={<Airdrops />} />
        <Route path="airdrops/grass" element={<GrassChecker />} />
        <Route path="docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
