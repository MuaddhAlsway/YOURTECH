import '../../styles/services/ServicePulse.css'

export default function ServicePulse() {
  return <section className="service-pulse" aria-labelledby="pulse-title">
    <div className="service-pulse__header"><span>04 / SERVICE PULSE</span><span>ONE SYSTEM / MANY SIGNALS</span></div>
    <div className="service-pulse__stage"><div className="service-pulse__words" aria-hidden="true"><span>STRATEGY</span><span>DESIGN</span><span>CODE</span><span>GROWTH</span></div><div className="service-pulse__core"><i /><strong id="pulse-title">Everything<br /><em>connects.</em></strong><p>One sharp idea can move through every layer of a digital experience.</p></div><div className="service-pulse__signal"><span>01</span><b>IDEA</b><i /><span>∞</span><b>IMPACT</b></div></div>
    <footer className="service-pulse__footer"><span>NO SILOS</span><span>NO STATIC OUTPUT</span><span>JUST CONNECTED WORK →</span></footer>
  </section>
}
