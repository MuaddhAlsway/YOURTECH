
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/OurProcess.css';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: '01',
    title: 'Discovery',
    ar: 'الاكتشاف',
    eyebrow: 'NICE TO MEET YOU',
    eyebrowAr: 'البداية من هنا',
    description: 'We explore your vision, audience, challenges and business goals.',
    descriptionAr: 'نفهم رؤيتك وجمهورك وتحدياتك وأهدافك التجارية.',
    className: 'discovery',
  },
  {
    number: '02',
    title: 'Strategy',
    ar: 'الاستراتيجية',
    eyebrow: 'CONNECT THE DOTS',
    eyebrowAr: 'نربط الأفكار',
    description: 'We turn insights into a clear product strategy and roadmap.',
    descriptionAr: 'نحوّل الأفكار إلى استراتيجية واضحة وخارطة طريق.',
    className: 'strategy',
  },
  {
    number: '03',
    title: 'Experience Design',
    ar: 'تصميم التجربة',
    eyebrow: 'MAKE IT MEANINGFUL',
    eyebrowAr: 'نصنع تجربة مميزة',
    description: 'We shape memorable interfaces around real user needs.',
    descriptionAr: 'نصمم تجارب رقمية مميزة تتمحور حول احتياجات المستخدم.',
    className: 'design',
  },
  {
    number: '04',
    title: 'Engineering',
    ar: 'التطوير',
    eyebrow: 'BUILD THE FUTURE',
    eyebrowAr: 'نبني المستقبل',
    description: 'We engineer reliable, scalable digital products.',
    descriptionAr: 'نطوّر منتجات رقمية موثوقة وقابلة للتوسع.',
    className: 'engineering',
  },
  {
    number: '05',
    title: 'Launch',
    ar: 'الإطلاق',
    eyebrow: 'READY FOR THE WORLD',
    eyebrowAr: 'جاهزون للانطلاق',
    description: 'We test, refine and bring your product to life.',
    descriptionAr: 'نختبر ونحسّن ونطلق منتجك إلى العالم.',
    className: 'launch',
  },
  {
    number: '06',
    title: 'Evolution',
    ar: 'التطوير المستمر',
    eyebrow: 'THIS IS NOT THE END',
    eyebrowAr: 'هذه ليست النهاية',
    description: 'We continuously improve, support and scale your product.',
    descriptionAr: 'نواصل تحسين منتجك ودعمه وتطويره مع نمو أعمالك.',
    className: 'evolution',
  },
];

// Coordinates are percentages of the desktop board.
// They create an intentionally irregular connected composition.
const points = [
  [27, 14],
  [73, 25],
  [34, 40],
  [76, 56],
  [26, 72],
  [65, 88],
];

function OurProcess({ language = 'en' }) {
  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  const isArabic = language === 'ar';

  useEffect(() => {
    const section = sectionRef.current;
    const board = boardRef.current;

    if (!section || !board) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.op-eyebrow, .op-heading, .op-intro',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.op-card',
        {
          opacity: 0,
          y: 110,
          rotate: (_, el) =>
            Number(el.dataset.rotation || 0) * 1.8,
          scale: 0.82,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: board,
            start: 'top 78%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.op-connector',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: board,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: 1,
          },
        }
      );

      const connector = section.querySelector('.op-connector');
      const traveler = section.querySelector('.op-traveler');

      ScrollTrigger.create({
        trigger: board,
        start: 'top 70%',
        end: 'bottom 75%',
        scrub: 1,
        onUpdate: ({ progress }) => {
          if (!connector || !traveler) return;
          const point = connector.getPointAtLength(
            progress * connector.getTotalLength()
          );
          gsap.set(traveler, {
            attr: { cx: point.x, cy: point.y },
          });
        },
      });

      gsap.fromTo(
        '.op-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.16,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: board,
            start: 'top 65%',
            once: true,
          },
        }
      );

      section.querySelectorAll('.op-card').forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 68%',
          end: 'bottom 32%',
          onEnter: () => setActiveStage(index),
          onEnterBack: () => setActiveStage(index),
          onLeaveBack: () => {
            if (index > 0) setActiveStage(index - 1);
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const goToStage = (index) => {
    setActiveStage(index);
  };

  const previous = () => {
    setActiveStage((current) =>
      (current - 1 + stages.length) % stages.length
    );
  };

  const next = () => {
    setActiveStage((current) =>
      (current + 1) % stages.length
    );
  };

  return (
    <section
      ref={sectionRef}
      className="our-process"
      id="our-process"
      dir={isArabic ? 'rtl' : 'ltr'}
      aria-labelledby="our-process-title"
    >
      <div className="op-container">
        <div className="op-topline op-eyebrow">
          <span>
            <span className="op-topline-mark" />
            {isArabic
              ? 'كيف نعمل معاً'
              : 'HOW WE WORK TOGETHER'}
          </span>
          <span>YOURTECH® — 2026</span>
        </div>

        <div className="op-heading-wrap">
          <h2 id="our-process-title" className="op-heading">
            {isArabic ? 'رحلتنا' : 'Process'}
            <span className="op-heading-dot">.</span>
          </h2>

          <div className="op-intro">
            <span className="op-intro-line" />
            <p>
              {isArabic
                ? 'من الفكرة الأولى إلى منتج يصنع أثراً. ست مراحل مترابطة لتحويل رؤيتك إلى واقع.'
                : 'From the first spark to lasting impact. Six connected stages that turn your vision into something extraordinary.'}
            </p>
          </div>
        </div>

        <div className="op-board" ref={boardRef}>
          <svg
            className="op-lines"
            viewBox="0 0 1000 1100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker id="op-arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
            <path
              className="op-connector"
              pathLength="1"
              d="
                M 270 154
                C 480 70, 720 100, 730 275
                S 300 350, 340 440
                S 780 440, 760 616
                S 230 690, 260 792
                S 670 810, 650 968
              "
              markerEnd="url(#op-arrowhead)"
            />
            <circle
              className="op-traveler"
              cx="270"
              cy="154"
              r="7"
              aria-hidden="true"
            />
          </svg>

          <span className="op-board-label op-board-label-left">
            {isArabic ? 'الأفكار' : 'IDEAS'}
            <br />
            {isArabic ? 'التنفيذ' : 'EXECUTION'}
            <br />
            {isArabic ? 'التأثير' : 'IMPACT'}
          </span>

          <span className="op-board-label op-board-label-right">
            DIGITAL
            <br />
            THINKING
            <br />
            SYSTEM
          </span>

          {stages.map((stage, index) => (
            <div
              key={stage.number}
              className={`op-item op-item-${stage.className}`}
              style={{
                '--point-x': `${points[index][0]}%`,
                '--point-y': `${points[index][1]}%`,
              }}
            >
              <span className="op-node" aria-hidden="true">
                {stage.number}
              </span>

              <button
                type="button"
                className={`op-card ${
                  activeStage === index ? 'is-active' : ''
                }`}
                data-rotation={
                  [7, -6, -4, 5, -7, 6][index]
                }
                onClick={() => goToStage(index)}
                aria-pressed={activeStage === index}
                aria-label={
                  isArabic
                    ? `المرحلة ${stage.number}: ${stage.ar}`
                    : `Stage ${stage.number}: ${stage.title}`
                }
              >
                <span className="op-card-top">
                  <span>
                    {isArabic
                      ? stage.eyebrowAr
                      : stage.eyebrow}
                  </span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>

                <span className="op-card-title">
                  {isArabic ? stage.ar : stage.title}
                </span>

                <span className="op-card-description">
                  {isArabic
                    ? stage.descriptionAr
                    : stage.description}
                </span>

                <span className="op-card-bottom">
                  <span>YOURTECH®</span>
                  <span>{stage.number} / 06</span>
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="op-mobile-controls">
          <button
            type="button"
            onClick={previous}
            aria-label={
              isArabic ? 'المرحلة السابقة' : 'Previous stage'
            }
          >
            {isArabic ? <ArrowRight /> : <ArrowLeft />}
          </button>

          <span aria-live="polite">
            {stages[activeStage].number} / 06
          </span>

          <button
            type="button"
            onClick={next}
            aria-label={
              isArabic ? 'المرحلة التالية' : 'Next stage'
            }
          >
            {isArabic ? <ArrowLeft /> : <ArrowRight />}
          </button>
        </div>

        <div className="op-footer">
          <div className="op-footer-label">
            <span className="op-footer-dot" />
            {isArabic
              ? 'خطوة بخطوة، نحو المستقبل'
              : 'STEP BY STEP. BUILT FOR WHAT’S NEXT.'}
          </div>

          <Link to="/contact" className="op-footer-link">
            <span>
              {isArabic
                ? 'لنبدأ مشروعك'
                : 'LET’S BUILD TOGETHER'}
            </span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
