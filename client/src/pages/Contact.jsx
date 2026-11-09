import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import '../styles/Contact.css'
import '../styles/ContactForm.css'
import '../styles/ContactSelection.css'

const serviceOptions = ['Build a new website', 'Improve my current website', 'Web Development', 'UI/UX Design', 'E-commerce', 'SaaS & Software', 'Automation & AI', 'I’m not sure yet']
const serviceLabels = { 'web-development': 'Web Development', 'ui-ux-design': 'UI/UX Design', ecommerce: 'E-commerce', 'saas-software': 'SaaS & Software', 'automation-ai': 'Automation & AI' }

export default function Contact() {
  const [searchParams] = useSearchParams()
  const selectedFromService = serviceLabels[searchParams.get('service')] || ''
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(false)
  const [service, setService] = useState(selectedFromService)
  const [showSelection, setShowSelection] = useState(Boolean(selectedFromService))
  return <><main className="contact-page"><header className="contact-page__top"><span>YOURTECH® / CONTACT</span><Link to="/">← Back home</Link></header><div className="contact-page__layout"><div className="contact-page__intro"><p>LET’S MAKE A START</p><h1>Bring us<br /><em>the question.</em></h1><div className="contact-page__details"><span>Riyadh / Saudi Arabia</span><a href="mailto:hello@yourtech.com">hello@yourtech.com</a><span>Sunday — Thursday / 09:00 — 18:00</span></div></div><form className="contact-page__form" onSubmit={(event) => { event.preventDefault(); if (service) setSent(true) }}><label>Your name<input required name="name" placeholder="How should we call you?" /></label><label>Email address<input required type="email" name="email" placeholder="you@company.com" /></label><label className="contact-service-field">What do you need?<button className={`contact-service-select${service ? ' has-value' : ''}`} type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{service || 'Select a direction'}<ChevronDown size={16} /></button>{open && <span className="contact-service-menu">{serviceOptions.map((option) => <button type="button" key={option} onClick={() => { setService(option); setOpen(false) }}>{option}</button>)}</span>}</label><input type="hidden" name="service" value={service} /><label>Tell us more<textarea required name="message" rows="4" placeholder="Tell us the first thing on your mind." /></label><button type="submit">{sent ? 'Message ready — thank you' : 'Send the signal'} <ArrowUpRight size={18} /></button>{sent && <p className="contact-page__success">Thanks. We’ll get back to you at the email you provided.</p>}</form></div><footer className="contact-page__footer"><span>YOURTECH® / 006</span><span>STRATEGY / DESIGN / TECHNOLOGY</span></footer></main>{showSelection && <div className="contact-selection" role="presentation"><div className="contact-selection__panel" role="dialog" aria-modal="true"><span>YOURTECH® / SERVICE SELECTED</span><h2>{selectedFromService}</h2><p>This service is selected in your form. Continue below to tell us about your project.</p><button type="button" onClick={() => setShowSelection(false)}>Continue to form <ArrowUpRight size={17} /></button></div></div>}<Footer /></>
}
