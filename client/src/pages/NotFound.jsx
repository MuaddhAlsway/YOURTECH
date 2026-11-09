import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

export default function NotFound() {
  return <main className="not-found"><div className="not-found__top"><span>YOURTECH® / ERROR</span><span>404 / PAGE NOT FOUND</span></div><div className="not-found__content"><p>THE SIGNAL GOT LOST</p><h1>404<span>.</span></h1><h2>This page moved<br /><em>somewhere else.</em></h2><Link to="/">Return to the homepage <b>↗</b></Link></div><div className="not-found__footer"><span>RIYADH / SAUDI ARABIA</span><span>BUILDING WHAT COMES NEXT.</span></div></main>
}
