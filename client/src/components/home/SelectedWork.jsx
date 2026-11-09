import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import fashionImage from '../../assets/projects/Fashion.png';
import tableImage from '../../assets/projects/TheTable.jpeg';
import mustangImage from '../../assets/projects/MustangGarage.png';
import trqImage from '../../assets/projects/TRQSTUDIOCOVER.png';
import lakumImage from '../../assets/projects/lakumCover.png';
import tdImage from '../../assets/projects/td.jpeg';
import authorImage from '../../assets/projects/Authur.png';
import muImage from '../../assets/projects/MUcommarance.png';
import '../../styles/SelectedWork.css';

const projectLibrary = [
  { id: 'fashion', image: fashionImage, url: 'https://fashion-clientsiding-ten.vercel.app/', en: { category: 'E-COMMERCE / DIGITAL EXPERIENCE', title: 'FASHION', tagline: 'Commerce meets editorial.', description: 'A full-stack fashion commerce platform combining shopping, storytelling, and digital operations.' }, ar: { category: 'التجارة الإلكترونية / التجارب الرقمية', title: 'فاشن', tagline: 'حيث تلتقي التجارة بالإبداع.', description: 'منصة تجارة إلكترونية متكاملة تجمع بين التسوق والمحتوى والعمليات الرقمية.' } },
  { id: 'table', image: tableImage, url: 'https://the-table-khaki.vercel.app/', en: { category: 'HOSPITALITY / DIGITAL ORDERING', title: 'THE TABLE', tagline: 'A new way to dine.', description: 'A digital restaurant experience for menus, ordering, reservations, and connected operations.' }, ar: { category: 'الضيافة / الطلب الرقمي', title: 'ذا تيبل', tagline: 'طريقة جديدة للطعام.', description: 'تجربة مطعم رقمية تشمل القائمة والطلب والحجز والعمليات المتصلة.' } },
  { id: 'mustang', image: mustangImage, url: 'https://mustange-era.vercel.app/', en: { category: 'AUTOMOTIVE / DIGITAL EXPERIENCE', title: 'MUSTANG GARAGE', tagline: 'Engineered for the extraordinary.', description: 'An immersive automotive platform for rare cars, editorial stories, and premium digital experiences.' }, ar: { category: 'السيارات / التجارب الرقمية', title: 'موستانج جراج', tagline: 'صُمم لعشاق التميز.', description: 'منصة سيارات غامرة للسيارات النادرة والقصص التحريرية والتجارب الرقمية المميزة.' } },
  { id: 'trq', image: trqImage, url: 'https://trqstudio.com/', en: { category: 'INTERIOR DESIGN', title: 'TRQ STUDIO', tagline: 'Spaces with a point of view.', description: 'An elegant platform for interior projects and design services.' }, ar: { category: 'التصميم الداخلي', title: 'TRQ STUDIO', tagline: 'مساحات برؤية واضحة.', description: 'منصة أنيقة لمشاريع وخدمات التصميم الداخلي.' } },
  { id: 'lakum', image: lakumImage, url: 'https://lakumartspace.com/', en: { category: 'ARTS / CULTURE', title: 'LAKUM ARTSPACE', tagline: 'Culture made discoverable.', description: 'A platform for exhibitions, events, and artistic content.' }, ar: { category: 'الفنون / الثقافة', title: 'LAKUM ARTSPACE', tagline: 'ثقافة يسهل اكتشافها.', description: 'منصة للمعارض والفعاليات والمحتوى الفني.' } },
  { id: 'td', image: tdImage, url: 'https://tdlogistics.co/', en: { category: 'LOGISTICS', title: 'TD LOGISTICS', tagline: 'Movement, made clear.', description: 'A digital platform for logistics services and customer enquiries.' }, ar: { category: 'الخدمات اللوجستية', title: 'TD لوجستكس', tagline: 'حركة أكثر وضوحاً.', description: 'منصة رقمية للخدمات اللوجستية وطلبات العملاء.' } },
  { id: 'author', image: authorImage, url: 'https://authorfsk.com/', en: { category: 'EDITORIAL / PERSONAL BRAND', title: 'AUTHOR FSK', tagline: 'A personal world in words.', description: 'A personal website for writing, books, and literary identity.' }, ar: { category: 'تحرير / هوية شخصية', title: 'AUTHOR FSK', tagline: 'عالم شخصي من الكلمات.', description: 'موقع شخصي للكتابة والمؤلفات والهوية الأدبية.' } },
  { id: 'mu', image: muImage, url: '#', en: { category: 'DIGITAL EXPERIENCE', title: 'MU', tagline: 'A new visual language.', description: 'An experimental digital experience from the YourTech archive.' }, ar: { category: 'تجربة رقمية', title: 'MU', tagline: 'لغة بصرية جديدة.', description: 'تجربة رقمية تجريبية من أرشيف يورتيك.' } },
];

const projects = [
  projectLibrary[3],
  projectLibrary[0],
  projectLibrary[2],
  projectLibrary[1],
  projectLibrary[5],
  projectLibrary[4],
  projectLibrary[7],
  projectLibrary[6],
];

const getLanguage = () => document.documentElement.lang?.startsWith('ar') ? 'ar' : 'en';

export default function SelectedWork() {
  const [language, setLanguage] = useState(getLanguage);
  const [active, setActive] = useState(2);
  const wheelLock = useRef(false);
  const ar = language === 'ar';
  const current = projects[active][language];
  const total = String(projects.length).padStart(2, '0');
  const slots = [-2, -1, 0, 1, 2].map(
    (offset) => (active + offset + projects.length) % projects.length
  );
  const move = (direction) => setActive((value) => (value + direction + projects.length) % projects.length);
  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 18 || wheelLock.current) return;
    event.preventDefault();
    wheelLock.current = true;
    move(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLock.current = false; }, 700);
  };

  useEffect(() => {
    const sync = () => setLanguage(getLanguage());
    window.addEventListener('site-language-change', sync);
    return () => window.removeEventListener('site-language-change', sync);
  }, []);

  return (
    <section className="selected-work selected-work--constellation" dir={ar ? 'rtl' : 'ltr'} aria-labelledby="selected-work-title">
      <div className="selected-work__constellation-shell">
        <header className="selected-work__constellation-header">
          <span>06 / SELECTED WORK</span>
          <span>YOURTECH® / DIGITAL EXHIBITION</span>
        </header>

        <div className="selected-work__constellation-intro">
          <span className="selected-work__constellation-kicker">THE CREATIVE CONSTELLATION</span>
          <h2 id="selected-work-title">WE DON'T JUST BUILD.<em>WE CREATE.</em></h2>
          <p>{ar ? 'ثلاثة مشاريع. تجربة واحدة تجمع التصميم والهندسة والتأثير.' : 'Three projects. One connected universe of design, engineering, and impact.'}</p>
        </div>

        <div className="selected-work__constellation-stage" role="region" aria-label={ar ? 'معرض الأعمال المختارة' : 'Selected work gallery'} onWheel={handleWheel}>
          <div className="selected-work__orbit" />
          {slots.map((projectIndex, slot) => {
            const project = projects[projectIndex];
            const content = project[language];
            const isActive = projectIndex === active;
            return (
              <button type="button" key={project.id} className={`selected-work__constellation-card selected-work__constellation-card--${slot} ${slot === 2 ? 'is-active' : ''}`} onClick={() => setActive(projectIndex)} aria-label={content.title}>
                <img loading="lazy" onLoad={(event) => event.currentTarget.classList.add('is-loaded')} src={project.image} alt="" />
                <span>{String(projectIndex + 1).padStart(2, '0')} / {total}</span>
                <strong>{content.title}</strong>
              </button>
            );
          })}
        </div>

        <div className="selected-work__constellation-info" aria-live="polite">
          <span className="selected-work__constellation-number">{String(active + 1).padStart(2, '0')}<small>/{total}</small></span>
          <div><span>{current.category}</span><h3>{current.title}</h3><p>{current.tagline} {current.description}</p></div>
          <div className="selected-work__constellation-actions"><a href={projects[active].url} target="_blank" rel="noopener noreferrer">{ar ? 'زيارة المشروع' : 'View project'} <ArrowUpRight size={17} /></a><button type="button" onClick={() => move(ar ? 1 : -1)} aria-label={ar ? 'المشروع السابق' : 'Previous project'}><ArrowLeft /></button><button type="button" onClick={() => move(ar ? -1 : 1)} aria-label={ar ? 'المشروع التالي' : 'Next project'}><ArrowRight /></button></div>
        </div>

        <footer className="selected-work__constellation-footer"><div>{projects.map((project, index) => <button key={project.id} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={project.en.title} />)}</div><Link to="/portfolio">{ar ? 'استكشف كل المشاريع' : 'Explore all projects'} <ArrowUpRight size={17} /></Link></footer>
      </div>
    </section>
  );
}
