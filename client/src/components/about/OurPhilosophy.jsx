import '../../styles/about/OurPhilosophy.css'

function OurPhilosophy() {
  const principles = [
    ['01', 'Stay curious', 'Questions are our raw material.'],
    ['02', 'Make meaning', 'Clarity beats decoration every time.'],
    ['03', 'Leave a trace', 'The best work keeps moving after launch.'],
  ]

  return (
    <section className="our-philosophy" aria-labelledby="philosophy-title">
      <div className="our-philosophy__folio">FIELD NOTES / 003 <span>OUR PHILOSOPHY</span> YOURTECH®</div>
      <div className="our-philosophy__composition">
        <div className="our-philosophy__index" aria-hidden="true"><b>03</b><span>OUR<br />PHILOSOPHY</span><i>↘</i></div>
        <div className="our-philosophy__statement"><p className="our-philosophy__eyebrow">THE WAY WE WORK</p><h2 id="philosophy-title">Make it<br /><em>matter.</em></h2><p className="our-philosophy__quote">“Good design gets attention.<br />Great direction gives it somewhere to go.”</p><span className="our-philosophy__signature">— YOURTECH STUDIO</span></div>
        <div className="our-philosophy__principles">{principles.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></article>)}</div>
      </div>
      <div className="our-philosophy__footer"><span>STRATEGY BEFORE STYLE</span><span>PEOPLE BEFORE PLATFORMS</span><span>PROGRESS BEFORE PERFECTION</span></div>
    </section>
  )
}

export default OurPhilosophy
