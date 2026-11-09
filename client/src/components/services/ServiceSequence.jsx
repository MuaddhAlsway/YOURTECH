import '../../styles/services/ServiceSequence.css'

const steps = [
  ['01', 'Signal', 'We find the real opportunity inside the brief.'],
  ['02', 'Shape', 'We turn the opportunity into a clear direction.'],
  ['03', 'Build', 'We make the system tangible, useful, and alive.'],
  ['04', 'Release', 'We launch with momentum, not a handoff.'],
]

export default function ServiceSequence() {
  return <section className="service-sequence" aria-labelledby="sequence-title">
    <header className="service-sequence__header"><span>03 / THE BUILD SEQUENCE</span><span>FROM SIGNAL TO SYSTEM</span></header>
    <div className="service-sequence__intro"><p>THE METHOD</p><h2 id="sequence-title">Good work<br /><em>has a rhythm.</em></h2></div>
    <div className="service-sequence__track">{steps.map(([number, title, description], index) => <article className="service-sequence__step" key={number}><div className="service-sequence__node"><span>{number}</span><i /></div><div><h3>{title}</h3><p>{description}</p></div><b>{String(index + 1).padStart(2, '0')}</b></article>)}</div>
    <footer className="service-sequence__footer"><span>NO BLACK BOXES</span><span>NO LOST MOMENTUM</span><span>JUST THE NEXT RIGHT MOVE →</span></footer>
  </section>
}
