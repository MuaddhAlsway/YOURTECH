import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import '../styles/ScrollToTop.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <button className={`scroll-to-top${visible ? ' is-visible' : ''}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"><ArrowUp size={19} /></button>
}
