import { ArrowUpRight } from 'lucide-react'
import '../../styles/services/ServicesCTA.css'

export default function ServicesCTA() {
  return <section className="services-cta" aria-labelledby="services-cta-title">
    <div className="services-cta__stamp">NEXT<br />MOVE</div>
    <div className="services-cta__top"><span>05 / YOUR TURN</span><span>END OF SERVICES INDEX</span></div>
    <div className="services-cta__content"><p>NO PERFECT BRIEF REQUIRED.</p><h2 id="services-cta-title">Bring us<br /><em>the question.</em></h2><a href="mailto:hello@yourtech.com?subject=Let%27s%20work%20together">Start the conversation <ArrowUpRight size={18} /></a></div>
    <div className="services-cta__note">We’ll help you find<br />the right way forward.</div>
    <footer><span>YOURTECH® / RIYADH</span><span>HELLO@YOURTECH.COM</span></footer>
  </section>
}
