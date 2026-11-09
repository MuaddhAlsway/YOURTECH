
import { useEffect, useRef, useState } from 'react';
import {
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  ArrowUpRight,
  Asterisk,
  Menu,
  X,
} from 'lucide-react';

import '../../styles/Navbar.css';

const translations = {
  en: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    contact: 'Contact',
    cta: "Let's Talk",
    tagline: 'BUILDING WHAT COMES NEXT.',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    navigation: 'Main navigation',
    language: 'Change language',
    homeLabel: 'YourTech — Home',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'خدماتنا',
    contact: 'تواصل معنا',
    cta: 'لنتحدث',
    tagline: 'نصنع مستقبل التقنية.',
    openMenu: 'فتح قائمة التنقل',
    closeMenu: 'إغلاق قائمة التنقل',
    navigation: 'التنقل الرئيسي',
    language: 'تغيير اللغة',
    homeLabel: 'يورتيك — الرئيسية',
  },
};

const NAV_ITEMS = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/services', key: 'services' },
  { path: '/contact', key: 'contact' },
];

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';

  try {
    return localStorage.getItem('site-language') === 'ar'
      ? 'ar'
      : 'en';
  } catch {
    return 'en';
  }
}

export default function Navbar() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const wasOpenRef = useRef(false);

  const t = translations[language];

  const links = NAV_ITEMS.map((item) => ({
    ...item,
    label: t[item.key],
  }));

  // Language and document direction
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === 'ar' ? 'rtl' : 'ltr';

    try {
      localStorage.setItem('site-language', language);
      window.dispatchEvent(new Event('site-language-change'));
    } catch {
      // Storage may be unavailable.
    }
  }, [language]);

  // Scroll-aware navbar
  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    updateScroll();

    window.addEventListener('scroll', updateScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll and manage keyboard focus
  useEffect(() => {
    if (!menuOpen) {
      if (wasOpenRef.current) {
        toggleRef.current?.focus();
        wasOpenRef.current = false;
      }
      return;
    }

    wasOpenRef.current = true;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const menu = menuRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(menu?.querySelectorAll(focusableSelector) || []);

    getFocusable()[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      return next;
    });
  };

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="navbar__inner">
        {/* Brand */}
        <Link
          to="/"
          className="navbar__brand"
          aria-label={t.homeLabel}
          onClick={() => setMenuOpen(false)}
        >
          <span className="navbar__brand-symbol">
            <Asterisk size={27} strokeWidth={2.5} />
          </span>

          <span className="navbar__brand-text">
            YOURTECH<span>.</span>
          </span>
        </Link>

        {/* Floating desktop capsule */}
        <nav
          className="navbar__island"
          aria-label={t.navigation}
        >
          <div className="navbar__island-links">
            {links.slice(0, 3).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `navbar__nav-link ${
                    isActive ? 'navbar__nav-link--active' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Link to="/contact" className="navbar__island-cta">
            <span>{t.cta}</span>
            <ArrowUpRight size={16} />
          </Link>
        </nav>

        {/* Right-side controls */}
        <div className="navbar__controls">
          <button
            type="button"
            className="navbar__language"
            onClick={toggleLanguage}
            aria-label={t.language}
          >
            <span
              className={
                language === 'en' ? 'navbar__lang-active' : ''
              }
            >
              EN
            </span>

            <span className="navbar__lang-divider">/</span>

            <span
              className={
                language === 'ar' ? 'navbar__lang-active' : ''
              }
            >
              AR
            </span>
          </button>

          <button
            ref={toggleRef}
            type="button"
            className={`navbar__menu-button ${
              menuOpen ? 'navbar__menu-button--active' : ''
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile-menu"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* Full-screen cinematic mobile menu */}
      <nav
        id="navbar-mobile-menu"
        ref={menuRef}
        className={`navbar__mobile ${
          menuOpen ? 'navbar__mobile--open' : ''
        }`}
        aria-label={t.navigation}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="navbar__mobile-inner">
          <div className="navbar__mobile-top">
            <span className="navbar__mobile-eyebrow">
              / NAVIGATION
            </span>

            <span className="navbar__mobile-count">
              001 — 004
            </span>
          </div>

          <div className="navbar__mobile-links">
            {links.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `navbar__mobile-link ${
                    isActive ? 'navbar__mobile-link--active' : ''
                  }`
                }
                style={{
                  '--item-index': index,
                }}
              >
                <span className="navbar__mobile-number">
                  0{index + 1}
                </span>

                <span className="navbar__mobile-title">
                  {item.label}
                </span>

                <ArrowUpRight
                  className="navbar__mobile-arrow"
                  size={28}
                  strokeWidth={1.5}
                />
              </NavLink>
            ))}
          </div>

          <div className="navbar__mobile-footer">
            <span className="navbar__mobile-tagline">
              {t.tagline}
            </span>

            <Link
              to="/contact"
              className="navbar__mobile-cta"
              onClick={() => setMenuOpen(false)}
            >
              {t.cta}
              <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
