
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft, Sparkles, MoveUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/StartProject.css'

gsap.registerPlugin(ScrollTrigger)

const copy = {
  en: {
    eyebrow: 'YOURTECH / NEW BUSINESS',
    availability: 'LET’S BUILD SOMETHING',
    cardLabel: 'A NOTE FROM YOURTECH',
    cardTitle: 'Every big idea starts somewhere.',
    cardText:
      'Tell us what you have in mind. We’ll help you find the right way forward.',
    cardFooter: 'YOURTECH — DIGITAL PARTNER',
    headingOne: 'Have a Project?',
    headingTwo: "Let's Work Together.",
    description:
      'Have an idea, a challenge, or something ambitious in mind? Let’s explore what we can create together.',
    button: 'Start a Project',
    bottomLeft: 'GOOD IDEAS DESERVE GREAT EXECUTION.',
    bottomRight: 'YOUR NEXT MOVE STARTS HERE.',
    watermark: 'LET’S TALK',
    floatingLabel: 'PROJECT BRIEF',
    floatingValue: 'YOUR NEXT BIG IDEA',
  },
  ar: {
    eyebrow: 'يورتك / مشاريع جديدة',
    availability: 'خلّنا نبني شيئًا مميزًا',
    cardLabel: 'رسالة من يورتك',
    cardTitle: 'كل فكرة كبيرة لها بداية.',
    cardText:
      'شاركنا فكرتك، وسنساعدك في اختيار الطريق المناسب لتحويلها إلى واقع.',
    cardFooter: 'يورتك — شريكك الرقمي',
    headingOne: 'عندك مشروع؟',
    headingTwo: 'خلّنا نشتغل سوا.',
    description:
      'عندك فكرة أو تحدٍ أو مشروع طموح؟ خلّنا نكتشف معًا كيف نحوله إلى تجربة رقمية مميزة.',
    button: 'ابدأ مشروعك',
    bottomLeft: 'الأفكار العظيمة تستحق تنفيذًا مميزًا.',
    bottomRight: 'خطوتك القادمة تبدأ من هنا.',
    watermark: 'خلّنا نتكلم',
    floatingLabel: 'ملف المشروع',
    floatingValue: 'فكرتك الكبيرة القادمة',
  },
}

export default function StartProject({ language = 'en' }) {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const cardRef = useRef(null)
  const briefRef = useRef(null)
  const contentRef = useRef(null)
  const ctaRef = useRef(null)

  const [isHovering, setIsHovering] = useState(false)

  const lang = language === 'ar' ? 'ar' : 'en'
  const isArabic = lang === 'ar'
  const t = copy[lang]

  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    const card = cardRef.current
    const brief = briefRef.current
    const content = contentRef.current
    const cta = ctaRef.current

    if (!section || !panel || !card || !brief || !content || !cta) {
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      })

      timeline
        .from(panel, {
          y: 75,
          opacity: 0,
          scale: 0.97,
          duration: 1.1,
          ease: 'power3.out',
        })
        .from(
          card,
          {
            x: isArabic ? 80 : -80,
            y: -30,
            rotation: isArabic ? 9 : -9,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.65'
        )
        .from(
          brief,
          {
            x: isArabic ? -80 : 80,
            y: 40,
            rotation: isArabic ? -8 : 8,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.85'
        )
        .from(
          content.children,
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .from(
          cta,
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.55,
            ease: 'back.out(1.6)',
          },
          '-=0.5'
        )

      // Floating cards: very subtle, continuous movement.
      gsap.to(card, {
        y: -9,
        rotation: isArabic ? 2 : -2,
        duration: 3.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(brief, {
        y: 10,
        rotation: isArabic ? -3 : 3,
        duration: 4.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      })
    }, section)

    return () => ctx.revert()
  }, [isArabic])

  function handlePointerMove(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const panel = panelRef.current
    if (!panel) return

    const bounds = panel.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    gsap.to(cardRef.current, {
      x: x * -15,
      rotationY: x * -5,
      rotationX: y * 4,
      duration: 0.7,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.to(briefRef.current, {
      x: x * 18,
      rotationY: x * 5,
      rotationX: y * -4,
      duration: 0.7,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function handlePointerLeave() {
    gsap.to([cardRef.current, briefRef.current], {
      x: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  return (
    <section
      ref={sectionRef}
      className="start-project"
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={lang}
      aria-labelledby="start-project-title"
    >
      <div
        ref={panelRef}
        className="start-project__panel"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="start-project__grid" aria-hidden="true" />

        <header className="start-project__topbar">
          <span className="start-project__eyebrow">{t.eyebrow}</span>

          <span className="start-project__status">
            <span className="start-project__status-dot" />
            {t.availability}
          </span>
        </header>

        {/* Floating editorial note */}
        <div ref={cardRef} className="start-project__note">
          <span className="start-project__quote" aria-hidden="true">
            “
          </span>

          <span className="start-project__note-label">
            {t.cardLabel}
          </span>

          <h3>{t.cardTitle}</h3>
          <p>{t.cardText}</p>

          <div className="start-project__note-footer">
            <span className="start-project__note-mark" aria-hidden="true">
              ✳
            </span>
            <span>{t.cardFooter}</span>
          </div>
        </div>

        {/* Floating project brief */}
        <div ref={briefRef} className="start-project__brief">
          <span className="start-project__brief-icon">
            <Sparkles size={19} strokeWidth={1.8} />
          </span>

          <span className="start-project__brief-label">
            {t.floatingLabel}
          </span>

          <strong>{t.floatingValue}</strong>

          <span className="start-project__brief-arrow">
            <MoveUpRight size={17} />
          </span>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="start-project__content">
          <div className="start-project__mini-label">
            <span className="start-project__mini-star">✳</span>
            {t.availability}
          </div>

          <h2 id="start-project-title" className="start-project__title">
            <span>{t.headingOne}</span>
            <span>{t.headingTwo}</span>
          </h2>

          <p className="start-project__description">
            {t.description}
          </p>

          <div className="start-project__cta-wrap">
            <Link
              ref={ctaRef}
              to="/contact"
              className="start-project__cta"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
            >
              <span>{t.button}</span>

              <span className="start-project__cta-icon">
                {isArabic ? (
                  <ArrowLeft size={19} />
                ) : (
                  <ArrowUpRight size={19} />
                )}
              </span>
            </Link>
          </div>
        </div>

        <div className="start-project__watermark" aria-hidden="true">
          {t.watermark}
        </div>

        <footer className="start-project__footer">
          <span>{t.bottomLeft}</span>
          <span>{t.bottomRight}</span>
        </footer>
      </div>
    </section>
  )
}
