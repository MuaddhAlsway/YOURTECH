import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const site = 'https://yourtech-woad.vercel.app'
const pages = {
  '/': { title: 'YOURTECH | Digital Solutions & Software Development', description: 'YOURTECH builds digital products, websites, applications, and technology solutions for businesses in Saudi Arabia.' },
  '/about': { title: 'About YOURTECH | Digital Innovation & Technology', description: 'Discover YOURTECH, a Riyadh-based studio focused on digital innovation, product development, design, and technology.' },
  '/services': { title: 'Our Services | Web Development, UI/UX & Digital Solutions | YOURTECH', description: 'Explore YOURTECH services including website development, web applications, UI/UX design, e-commerce, SaaS, and AI automation.' },
  '/contact': { title: 'Contact YOURTECH | Start Your Digital Project', description: 'Contact YOURTECH to discuss your website, application, digital product, or technology project.' },
}

function setMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`)
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, value); document.head.appendChild(element) }
  element.setAttribute('content', content)
}

export default function RouteSEO() {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = pages[pathname] || { title: 'Page Not Found | YOURTECH', description: 'The requested YOURTECH page could not be found.' }
    const url = `${site}${pathname === '/' ? '/' : pathname}`
    document.title = page.title
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
    setMeta('name', 'description', page.description)
    setMeta('property', 'og:title', page.title)
    setMeta('property', 'og:description', page.description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', page.title)
    setMeta('name', 'twitter:description', page.description)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = url
    let schema = document.getElementById('yourtech-route-schema')
    if (!schema) { schema = document.createElement('script'); schema.id = 'yourtech-route-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema) }
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': pathname === '/services' ? 'ProfessionalService' : 'Organization', name: 'YOURTECH', url: site, description: page.description, logo: `${site}/yourtech-mark.svg`, areaServed: 'Saudi Arabia' })
  }, [pathname])
  return null
}
