
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Layers3,
  PenTool,
  Code2,
  Cpu,
} from 'lucide-react';

import heroPortrait from '../../assets/Hero010.png';
import heroPortrait02 from '../../assets/Hero02.png';
import heroPortrait03 from '../../assets/Hero03.png';
import '../../styles/Hero.css';

const content = {
  en: {
    eyebrow: 'Technology Agency',
    line1: 'We Build',
    line2: 'What',
    line3: 'Comes Next.',
    slideCopy: [
      { line2: 'What', line3: 'Comes Next.', description: 'We transform ambitious ideas into powerful digital experiences, products, and systems.' },
      { line2: 'Ideas', line3: 'Into Impact.', description: 'We turn bold ideas into memorable products that move businesses forward.' },
      { line2: 'Systems', line3: 'That Scale.', description: 'We engineer reliable digital systems built for growth and long-term impact.' },
    ],
    description:
      'We transform ambitious ideas into powerful digital experiences, products, and systems.',
    primary: 'Start a Project',
    secondary: 'Our Services',
    featureLabel: 'Design to Build.',
    expertise: 'Our Expertise',
    capabilities: [
      'Product',
      'Design',
      'Engineering',
      'AI & Data',
    ],
    experience: 'Digital Experiences',
    location: 'Built for the Future',
    scroll: 'Scroll Down',
    wordmark: 'YOURTECH',
    slides: [
      'Design to Build.',
      'Ideas to Impact.',
      'Systems that Scale.',
    ],
  },
  ar: {
    eyebrow: 'وكالة تقنية إبداعية',
    line1: 'نصنع',
    line2: 'ما يأتي',
    line3: 'بعد ذلك.',
    slideCopy: [
      { line2: 'ما يأتي', line3: 'بعد ذلك.', description: 'نحوّل الأفكار الطموحة إلى تجارب ومنتجات وأنظمة رقمية استثنائية.' },
      { line2: 'الأفكار', line3: 'إلى تأثير.', description: 'نحوّل الأفكار الجريئة إلى منتجات مؤثرة تدفع الأعمال إلى الأمام.' },
      { line2: 'أنظمة', line3: 'تتوسع.', description: 'نبني أنظمة رقمية موثوقة للنمو والتأثير طويل المدى.' },
    ],
    description:
      'نحوّل الأفكار الطموحة إلى تجارب ومنتجات وأنظمة رقمية استثنائية.',
    primary: 'ابدأ مشروعك',
    secondary: 'خدماتنا',
    featureLabel: 'من التصميم إلى التنفيذ.',
    expertise: 'مجالات خبرتنا',
    capabilities: [
      'المنتجات',
      'التصميم',
      'البرمجة',
      'الذكاء الاصطناعي',
    ],
    experience: 'تجارب رقمية مبتكرة',
    location: 'نصنع المستقبل',
    scroll: 'مرّر للأسفل',
    wordmark: 'YOURTECH',
    slides: [
      'من التصميم إلى التنفيذ.',
      'من الفكرة إلى التأثير.',
      'أنظمة قابلة للتوسع.',
    ],
  },
};

const icons = [Layers3, PenTool, Code2, Cpu];
const heroImages = [heroPortrait, heroPortrait02, heroPortrait03];

export default function Hero({ language }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    language || (localStorage.getItem('site-language') === 'ar' ? 'ar' : 'en')
  );

  useEffect(() => {
    const syncLanguage = () => {
      setSelectedLanguage(localStorage.getItem('site-language') === 'ar' ? 'ar' : 'en');
    };
    window.addEventListener('site-language-change', syncLanguage);
    return () => window.removeEventListener('site-language-change', syncLanguage);
  }, []);

  const lang = selectedLanguage === 'ar' ? 'ar' : 'en';
  const t = content[lang];

  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = t.slideCopy[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % t.slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [t.slides.length]);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % t.slides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + t.slides.length) % t.slides.length
    );
  };

  const scrollDown = () => {
    document.getElementById('next-section')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <section
      className={`hero hero--slide-${activeSlide + 1}`}
      id="home"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      aria-labelledby="hero-heading"
    >
      <div className="hero__ambient hero__ambient--one" />
      <div className="hero__ambient hero__ambient--two" />

      <div className="hero__container">

        {/* Oversized background branding */}
        <div className="hero__watermark" aria-hidden="true">
          {t.wordmark}
        </div>

        {/* Central portrait */}
        <div className="hero__portrait-wrap" aria-hidden="true">
          <div className="hero__portrait-glow" />

          <img
            loading="lazy"
            onLoad={(event) => event.currentTarget.classList.add('is-loaded')}
            src={heroImages[activeSlide]}
            alt=""
            className="hero__portrait hero__portrait--slide"
            fetchPriority="high"
            key={heroImages[activeSlide]}
          />
        </div>

        {/* Left editorial content */}
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line" />
            {t.eyebrow}
          </div>

          <h1 className="hero__heading" id="hero-heading" aria-live="polite">
            <span>{t.line1}</span>
            <span key={`line2-${activeSlide}`} className="hero__slide-text">
              {currentSlide.line2}
            </span>
            <span className="hero__heading-accent">
              {currentSlide.line3}
            </span>
          </h1>

          <p className="hero__description">
            <span key={`description-${activeSlide}`} className="hero__slide-text">
              {currentSlide.description}
            </span>
          </p>

          <div className="hero__actions">
            <Link to="/contact" className="hero__button-primary">
              <span>{t.primary}</span>
              <ArrowUpRight size={19} />
            </Link>

            <Link to="/services" className="hero__button-secondary">
              {t.secondary}
            </Link>
          </div>

          <div className="hero__signature">
            <span className="hero__signature-mark" />
            <span>DESIGN / DEVELOPMENT / INNOVATION</span>
          </div>
        </div>

        {/* Right side floating content */}
        <div className="hero__side">

          <div className="hero__feature">
            <div className="hero__feature-top">
              <span className="hero__feature-index">
                0{activeSlide + 1}
              </span>

              <Link
                to="/services"
                className="hero__feature-action"
                aria-label={t.secondary}
              >
                <ArrowUpRight size={20} />
              </Link>
            </div>

            <h2 className="hero__feature-title" aria-live="polite">
              {t.slides[activeSlide]}
            </h2>

            <div className="hero__feature-art" aria-hidden="true">
              <div className="hero__wave hero__wave--one" />
              <div className="hero__wave hero__wave--two" />
              <div className="hero__wave hero__wave--three" />
            </div>

            <div className="hero__feature-bottom">
              <div className="hero__feature-dots">
                {t.slides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide}
                    className={`hero__feature-dot ${
                      activeSlide === index
                        ? 'hero__feature-dot--active'
                        : ''
                    }`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-pressed={activeSlide === index}
                  />
                ))}
              </div>

              <div className="hero__feature-controls">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous slide"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="hero__expertise">
            <h3>{t.expertise}</h3>

            <div className="hero__expertise-grid">
              {t.capabilities.map((item, index) => {
                const Icon = icons[index];

                return (
                  <div className="hero__expertise-item" key={item}>
                    <Icon size={23} strokeWidth={1.7} />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="hero__bottom">
          <span>{t.experience}</span>

          <span className="hero__bottom-center">
            <span className="hero__status-dot" />
            {t.location}
          </span>

          <button
            type="button"
            className="hero__scroll"
            onClick={scrollDown}
          >
            <span>{t.scroll}</span>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
