
import { useEffect, useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import aboutHeroImage from '../../assets/optimized/Hero010-desktop.webp';
import '../../styles/about/AboutHero.css';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      tl.from('.about-hero__eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          '.about-hero__line',
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.15,
          },
          '-=0.35'
        )
        .from(
          '.about-hero__visual',
          {
            y: 70,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
          },
          '-=0.8'
        )
        .from(
          '.about-hero__bottom',
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        );

      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection =
      sectionRef.current?.nextElementSibling;

    nextSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      className="about-hero"
      ref={sectionRef}
      aria-labelledby="about-hero-title"
    >
      <div className="about-hero__container">
        <div className="about-hero__top about-hero__eyebrow">
          <span>YOURTECH® / ABOUT US</span>
          <span>BASED IN SAUDI ARABIA</span>
        </div>

        <div className="about-hero__content">
          <div className="about-hero__heading">
            <h1 id="about-hero-title">
              <span className="about-hero__line-wrap">
                <span className="about-hero__line">
                  WE BUILD
                </span>
              </span>

              <span className="about-hero__line-wrap">
                <span className="about-hero__line about-hero__line--accent">
                  WHAT'S NEXT.
                </span>
              </span>
            </h1>
          </div>

          <div className="about-hero__visual">
            <img
              loading="lazy"
              onLoad={(event) => event.currentTarget.classList.add('is-loaded')}
              ref={imageRef}
              src={aboutHeroImage}
              alt="Futuristic Saudi creative portrait"
              className="about-hero__image"
            />

            <span
              className="about-hero__visual-label"
              aria-hidden="true"
            >
              FUTURE / 001
            </span>
          </div>
        </div>

        <div className="about-hero__bottom">
          <p className="about-hero__description">
            Technology with purpose.
            <br />
            Design with impact.
          </p>

          <span className="about-hero__index">
            INDEPENDENT DIGITAL STUDIO
          </span>

          <button
            type="button"
            className="about-hero__scroll"
            onClick={scrollToNext}
            aria-label="Scroll to next section"
          >
            <ArrowDownRight size={25} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
