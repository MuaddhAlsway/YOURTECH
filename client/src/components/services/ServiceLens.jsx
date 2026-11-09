import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import '../../styles/services/ServiceLens.css'

const lenses = [
  ['01', 'I have an idea', 'Give it a clear shape.', ['Strategy', 'UI/UX Design', 'Web Development']],
  ['02', 'I need to grow', 'Build the system behind the momentum.', ['E-commerce', 'SaaS & Software', 'Automation & AI']],
  ['03', 'I need to evolve', 'Make the next version feel inevitable.', ['UI/UX Design', 'Web Development', 'SaaS & Software']],
]

export default function ServiceLens() {
  const [active, setActive] = useState(0)
  const lens = lenses[active]
  return <section className="service-lens" aria-labelledby="service-lens-title">
    <header className="service-lens__header"><span>02 / FIND YOUR DIRECTION</span><span>THE SERVICE LENS</span></header>
    <div className="service-lens__layout">
      <div className="service-lens__intro"><p className="service-lens__eyebrow">START WITH THE QUESTION</p><h2 id="service-lens-title">Where are<br /><em>you now?</em></h2><p>Choose the closest starting point. We’ll show you the route.</p></div>
      <div className="service-lens__choices">{lenses.map(([number, title, subtitle], index) => <button type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} key={number}><span>{number}</span><strong>{title}</strong><small>{subtitle}</small><i>↗</i></button>)}</div>
      <div className="service-lens__answer"><span className="service-lens__answer-label">YOUR ROUTE / {lens[0]}</span><h3>{lens[1]}</h3><p>{lens[2]}</p><div className="service-lens__route">{lens[3].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div><a href="mailto:hello@yourtech.com?subject=Find%20my%20YourTech%20route">Find my route <ArrowUpRight size={17} /></a></div>
    </div>
  </section>
}
