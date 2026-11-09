import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/services/ServicesHero.css'
import '../../styles/services/ServicesCapabilities.css'
import '../../styles/services/ServicesRefine.css'
import '../../styles/services/ServicesClickable.css'

const services = [
  ['web-development', 'Web Development', 'Animated browser window with a live website preview', ['Marketing sites', 'Web apps', 'CMS integration']],
  ['ui-ux-design', 'UI/UX Design', 'Interactive wireframe transforming into a polished interface', ['User journeys', 'Wireframes', 'Design systems']],
  ['ecommerce', 'E-commerce', 'Floating product gallery and checkout interface', ['Storefronts', 'Checkout flows', 'Order systems']],
  ['saas-software', 'SaaS & Software', 'Dynamic analytics dashboard with animated data', ['Product strategy', 'Dashboards', 'Scalable systems']],
  ['automation-ai', 'Automation & AI', 'Connected workflow nodes with moving signals', ['Workflow mapping', 'AI assistants', 'Smart integrations']],
]

export default function ServicesHero() {
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedService(null)
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = selectedService ? 'hidden' : ''
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = '' }
  }, [selectedService])

  return <section className="services-hero" aria-labelledby="services-hero-title">
    <div className="services-hero__noise" />
    <header className="services-hero__top"><span>YOURTECH® / 01</span><span>SERVICES INDEX</span><span>RIYADH / SAUDI ARABIA</span></header>
    <div className="services-hero__layout">
      <aside className="services-hero__rail"><b>SCROLL</b><span>THE WORK BEHIND THE WORK</span><i>↓</i></aside>
      <div className="services-hero__intro"><p className="services-hero__eyebrow">WHAT WE BUILD</p><h1 id="services-hero-title">A sharper<br /><em>way forward.</em></h1><p className="services-hero__lead">Capability-led digital work for teams ready to move with intention.</p><Link to="#services-list" className="services-hero__link">EXPLORE THE INDEX <span>↓</span></Link></div>
      <div className="services-hero__index" id="services-list"><div className="services-hero__index-label"><span>THE SYSTEM</span><span>05 CAPABILITIES</span></div>{services.map(([id, title, description, deliverables], index) => { const open = () => setSelectedService({ id, title, description, deliverables, index }); return <article className={`services-hero__service service-${id}`} key={id} role="button" tabIndex="0" onClick={open} onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && open()}><div className="services-hero__service-copy"><span>0{index + 1}</span><h2>{title}</h2><p>{description}</p><button type="button" onClick={(event) => { event.stopPropagation(); open() }}>Explore Service <span>↗</span></button></div></article> })}</div>
    </div>
    <footer className="services-hero__bottom"><span>STRATEGY / DESIGN / TECHNOLOGY</span><span>CAPABILITIES, NOT CASE STUDIES.</span></footer>
    {selectedService && <div className="service-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedService(null)}><div className="service-modal__panel" role="dialog" aria-modal="true" aria-labelledby="service-modal-title"><button className="service-modal__close" type="button" onClick={() => setSelectedService(null)} aria-label="Close service details">close</button><span className="service-modal__number">0{selectedService.index + 1} / SERVICE</span><p className="service-modal__eyebrow">DIRECT SERVICE BRIEF</p><h2 id="service-modal-title">{selectedService.title}</h2><p className="service-modal__description">{selectedService.description}</p><div className="service-modal__deliverables">{selectedService.deliverables.map((item) => <span key={item}>{item}</span>)}</div><Link className="service-modal__cta" to={`/contact?service=${encodeURIComponent(selectedService.id)}`} onClick={() => setSelectedService(null)}>Start this service <span>↗</span></Link></div></div>}
  </section>
}
