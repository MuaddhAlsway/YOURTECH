

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  MoveHorizontal,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import '../../styles/ServicesShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'web',
    number: '01',
    en: {
      category: 'DIGITAL ENGINEERING',
      title: 'Web Development',
      description:
        'High-performance websites and web applications engineered for speed, accessibility, and scale.',
    },
    ar: {
      category: 'الهندسة الرقمية',
      title: 'تطوير المواقع',
      description:
        'مواقع وتطبيقات ويب عالية الأداء مصممة للسرعة وسهولة الوصول وقابلية التوسع.',
    },
  },
  {
    id: 'commerce',
    number: '02',
    en: {
      category: 'DIGITAL COMMERCE',
      title: 'E-Commerce Solutions',
      description:
        'Digital storefronts, seamless checkout experiences, and connected commerce operations.',
    },
    ar: {
      category: 'التجارة الرقمية',
      title: 'حلول التجارة الإلكترونية',
      description:
        'متاجر إلكترونية وتجارب شراء سلسة وأنظمة متكاملة لإدارة العمليات التجارية.',
    },
  },
  {
    id: 'design',
    number: '03',
    en: {
      category: 'CREATIVE EXPERIENCE',
      title: 'UI/UX Design',
      description:
        'Human-centered digital experiences that balance visual identity with effortless usability.',
    },
    ar: {
      category: 'التجربة الإبداعية',
      title: 'تصميم واجهات وتجربة المستخدم',
      description:
        'تجارب رقمية تتمحور حول الإنسان وتجمع بين الهوية البصرية وسهولة الاستخدام.',
    },
  },
  {
    id: 'software',
    number: '04',
    en: {
      category: 'BUSINESS SYSTEMS',
      title: 'Custom Software',
      description:
        'Purpose-built dashboards, platforms, and business systems designed around real workflows.',
    },
    ar: {
      category: 'أنظمة الأعمال',
      title: 'تطوير الأنظمة المخصصة',
      description:
        'لوحات تحكم ومنصات وأنظمة مخصصة تلائم احتياجات الأعمال وعملياتها الفعلية.',
    },
  },
  {
    id: 'ai',
    comingSoon: true,
    number: '05',
    en: {
      category: 'INTELLIGENT SYSTEMS',
      title: 'AI & Automation',
      description:
        'Intelligent integrations and automated workflows that reduce repetitive work.',
    },
    ar: {
      category: 'الأنظمة الذكية',
      title: 'الذكاء الاصطناعي والأتمتة',
      description:
        'تكاملات ذكية وسير عمل آلي يقلل المهام المتكررة ويعزز الإنتاجية.',
    },
  },
];

const translations = {
  en: {
    eyebrow: '05 / OUR CAPABILITIES',
    heading: "WE DON'T JUST BUILD.",
    accent: "WE CREATE WHAT'S NEXT.",
    subtitle: 'Five disciplines. One connected digital ecosystem.',
    discover: 'Explore All Services',
    view: 'Explore Service',
    drag: 'DRAG TO EXPLORE',
    previous: 'Previous service',
    next: 'Next service',
    gallery: 'Interactive services gallery',
  },
  ar: {
    eyebrow: '05 / خدماتنا',
    heading: 'نحن لا نكتفي بالتطوير.',
    accent: 'بل نصنع ما يأتي بعده.',
    subtitle: 'خمسة تخصصات. منظومة رقمية متكاملة.',
    discover: 'اكتشف جميع خدماتنا',
    view: 'استكشف الخدمة',
    drag: 'اسحب للاستكشاف',
    previous: 'الخدمة السابقة',
    next: 'الخدمة التالية',
    gallery: 'معرض الخدمات التفاعلي',
  },
};

const wrapIndex = (index) =>
  ((index % services.length) + services.length) %
  services.length;

const getLanguage = () => {
  if (typeof document === 'undefined') return 'en';

  return document.documentElement.lang
    .toLowerCase()
    .startsWith('ar')
    ? 'ar'
    : 'en';
};

export default function ServicesShowcase() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const activeRef = useRef(2);
  const dragRef = useRef(null);
  const animationRef = useRef(null);

  const [language, setLanguage] = useState(getLanguage);
  const [activeIndex, setActiveIndex] = useState(2);
  const [reducedMotion, setReducedMotion] = useState(false);

  const t = translations[language];
  const isArabic = language === 'ar';
  const activeService = services[activeIndex];

  useEffect(() => {
    const updateLanguage = () => setLanguage(getLanguage());
    updateLanguage();

    const observer = new MutationObserver(updateLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const update = () => setReducedMotion(media.matches);
    update();

    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  const getPositions = useCallback((width) => {
    const mobile = width < 600;
    const tablet = width >= 600 && width < 1024;

    if (mobile) {
      return {
        x: [0, 105, 165],
        y: [0, 14, 30],
        z: [0, -120, -260],
        scale: [1, 0.72, 0.5],
        rotation: [0, 28, 48],
        opacity: [1, 0.75, 0.22],
      };
    }

    if (tablet) {
      return {
        x: [0, 195, 310],
        y: [0, 18, 38],
        z: [0, -150, -300],
        scale: [1, 0.78, 0.55],
        rotation: [0, 32, 52],
        opacity: [1, 0.85, 0.3],
      };
    }

    return {
      x: [0, 290, 465],
      y: [0, 20, 48],
      z: [0, -180, -380],
      scale: [1, 0.82, 0.58],
      rotation: [0, 36, 58],
      opacity: [1, 0.9, 0.4],
    };
  }, []);

  const animateOrbit = useCallback(
    (nextIndex, immediate = false) => {
      const normalized = wrapIndex(nextIndex);
      activeRef.current = normalized;
      setActiveIndex(normalized);

      const stage = stageRef.current;
      if (!stage) return;

      const positions = getPositions(stage.clientWidth);
      const duration = immediate || reducedMotion ? 0 : 0.95;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      const timeline = gsap.timeline({
        defaults: {
          duration,
          ease: 'power3.inOut',
          overwrite: 'auto',
        },
      });

      services.forEach((service, index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        let distance = index - normalized;

        if (distance > services.length / 2) {
          distance -= services.length;
        }

        if (distance < -services.length / 2) {
          distance += services.length;
        }

        const abs = Math.abs(distance);
        const sign = Math.sign(distance);

        const visualSign = isArabic ? -sign : sign;

        const x = visualSign * positions.x[abs];
        const y = positions.y[abs];
        const z = positions.z[abs];
        const scale = positions.scale[abs];
        const rotationY = -visualSign * positions.rotation[abs];
        const opacity = positions.opacity[abs];

        // The active card stays in front.
        card.style.zIndex = String(10 - abs);
        card.style.pointerEvents = abs === 0 ? 'auto' : 'none';

        timeline.to(
          card,
          {
            x,
            y,
            z,
            scale,
            rotationY,
            rotationZ: visualSign * abs * 2,
            opacity,
            filter: `blur(${abs === 2 ? 2 : 0}px)`,
          },
          0
        );
      });

      animationRef.current = timeline;
    },
    [getPositions, isArabic, reducedMotion]
  );

  const navigate = useCallback(
    (direction) => {
      animateOrbit(activeRef.current + direction);
    },
    [animateOrbit]
  );

  useLayoutEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: 'center center',
      transformPerspective: 1200,
      force3D: true,
    });

    animateOrbit(activeRef.current, true);

    const stage = stageRef.current;
    if (!stage) return;

    const resizeObserver = new ResizeObserver(() => {
      animateOrbit(activeRef.current, true);
    });

    resizeObserver.observe(stage);

    return () => {
      resizeObserver.disconnect();
      animationRef.current?.kill();
    };
  }, [animateOrbit]);

  useEffect(() => {
    const section = sectionRef.current;
    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    if (!section || reducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-showcase__intro',
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.services-showcase__stage',
        { opacity: 0, y: 70, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;

    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      id: event.pointerId,
    };
  };

  const handlePointerUp = (event) => {
    const start = dragRef.current;
    if (!start || start.id !== event.pointerId) return;

    dragRef.current = null;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (
      Math.abs(deltaX) < 45 ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    const direction = deltaX < 0 ? 1 : -1;
    navigate(isArabic ? -direction : direction);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(isArabic ? -1 : 1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigate(isArabic ? 1 : -1);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="services-showcase"
      dir={isArabic ? 'rtl' : 'ltr'}
      aria-labelledby="services-showcase-title"
    >
      <div className="services-showcase__container">
        <div className="services-showcase__intro">
          <div className="services-showcase__eyebrow">
            <span className="services-showcase__eyebrow-line" />
            {t.eyebrow}
          </div>

          <h2 id="services-showcase-title">
            <span>{t.heading}</span>
            <em>{t.accent}</em>
          </h2>

          <p>{t.subtitle}</p>
        </div>

        <div
          ref={stageRef}
          className="services-showcase__stage"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.gallery}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragRef.current = null;
          }}
        >
          <div className="services-showcase__orbit-line" />

          {services.map((service, index) => {
            const content = service[language];
            const isActive = index === activeIndex;

            return (
              <article
                key={service.id}
                ref={(element) => {
                  cardsRef.current[index] = element;
                }}
                className={`services-showcase__card ${
                  isActive ? 'is-active' : ''
                }`}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${service.number}: ${content.title}`}
              >
                <div className="services-showcase__card-shade" />

                <div className="services-showcase__card-top">
                  <span>{service.number} / 05</span>
                  <span>YOURTECH®</span>
                </div>

                {service.comingSoon && (
                  <span className="services-showcase__coming-soon">
                    {language === 'ar' ? 'قريباً' : 'COMING SOON'}
                  </span>
                )}

                <div className="services-showcase__card-bottom">
                  <span>{content.category}</span>
                  <h3>{content.title}</h3>
                </div>
              </article>
            );
          })}
        </div>

        <div className="services-showcase__controls">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label={t.previous}
            className="services-showcase__arrow"
          >
            {isArabic ? <ArrowRight /> : <ArrowLeft />}
          </button>

          <div className="services-showcase__pagination">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                aria-label={`${service.number}: ${
                  service[language].title
                }`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={index === activeIndex ? 'is-active' : ''}
                onClick={() => animateOrbit(index)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate(1)}
            aria-label={t.next}
            className="services-showcase__arrow"
          >
            {isArabic ? <ArrowLeft /> : <ArrowRight />}
          </button>
        </div>

        <div className="services-showcase__detail">
          <div className="services-showcase__detail-number">
            <span>{activeService.number}</span>
            <span>/ 05</span>
          </div>

          <div
            className="services-showcase__detail-content"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="services-showcase__category">
              {activeService[language].category}
            </span>

            <h3>{activeService[language].title}</h3>
            <p>{activeService[language].description}</p>
          </div>

          <Link
            to="/services"
            className="services-showcase__detail-link"
          >
            <span>{t.view}</span>
            {isArabic ? <ArrowLeft size={19} /> : <ArrowUpRight size={19} />}
          </Link>
        </div>

        <div className="services-showcase__footer">
          <span className="services-showcase__drag">
            <MoveHorizontal size={18} />
            {t.drag}
          </span>

          <Link to="/services" className="services-showcase__all">
            {t.discover}
            {isArabic ? <ArrowLeft size={18} /> : <ArrowUpRight size={18} />}
          </Link>
        </div>
      </div>
    </section>
  );
}
