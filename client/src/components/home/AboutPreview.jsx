import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import studioImage from '../../assets/optimized/Hero010-desktop.webp';
import visionImage from '../../assets/optimized/Hero02.webp';
import futureImage from '../../assets/optimized/Hero03.webp';
import '../../styles/AboutPreview.css';

const chapters = [
  { image: studioImage, en: { tag: '01 / ORIGIN', title: 'Ideas deserve a better beginning.' }, ar: { tag: '٠١ / البداية', title: 'كل فكرة تستحق بداية أفضل.' } },
  { image: visionImage, en: { tag: '02 / METHOD', title: 'Clarity turns ambition into momentum.' }, ar: { tag: '٠٢ / المنهج', title: 'الوضوح يحوّل الطموح إلى زخم.' } },
  { image: futureImage, en: { tag: '03 / FUTURE', title: 'We build what people remember.' }, ar: { tag: '٠٣ / المستقبل', title: 'نبني ما يتذكره الناس.' } },
];

export default function AboutPreview() {
  const [language, setLanguage] = useState(() => localStorage.getItem('site-language') === 'ar' ? 'ar' : 'en');
  const [active, setActive] = useState(0);
  const ar = language === 'ar';
  const copy = ar ? { eyebrow: 'عن يورتيك / ٠٠١', title: 'نحن لا نطارد المستقبل.', accent: 'نحن نصنعه.', body: 'استوديو تقني إبداعي يجمع الاستراتيجية والتصميم والهندسة لصناعة تجارب رقمية لها معنى.', cta: 'اكتشف قصتنا', statOne: 'سنوات خبرة', statTwo: 'شريكاً حول العالم', next: 'الفصل التالي', label: 'قصة يورتيك' } : { eyebrow: 'ABOUT YOURTECH / 001', title: 'We do not chase the future.', accent: 'We build it.', body: 'A creative technology studio combining strategy, design, and engineering to create digital experiences with meaning.', cta: 'Discover our story', statOne: 'Years of experience', statTwo: 'Global partners', next: 'Next chapter', label: 'The YourTech story' };

  useEffect(() => {
    const sync = () => setLanguage(localStorage.getItem('site-language') === 'ar' ? 'ar' : 'en');
    window.addEventListener('site-language-change', sync);
    return () => window.removeEventListener('site-language-change', sync);
  }, []);

  const chapter = chapters[active][language];
  const move = (direction) => setActive((current) => (current + direction + chapters.length) % chapters.length);

  return (
    <section className="about-preview about-preview--modern" dir={ar ? 'rtl' : 'ltr'} aria-labelledby="about-preview-title">
      <div className="about-preview__modern-shell">
        <header className="about-preview__modern-header"><span>{copy.eyebrow}</span><span>0{active + 1} <i>/</i> 03</span></header>
        <div className="about-preview__modern-grid">
          <div className="about-preview__modern-copy"><span className="about-preview__modern-kicker">{copy.label}</span><h2 id="about-preview-title">{copy.title}<em>{copy.accent}</em></h2><p>{copy.body}</p><Link to="/about" className="about-preview__modern-cta">{copy.cta}<ArrowUpRight size={18} /></Link><div className="about-preview__modern-stats"><strong>10<span>+</span></strong><small>{copy.statOne}</small><strong>24<span>+</span></strong><small>{copy.statTwo}</small></div></div>
          <div className="about-preview__modern-visual"><div className="about-preview__modern-image-wrap"><img loading="lazy" onLoad={(event) => event.currentTarget.classList.add('is-loaded')} key={chapter.title} src={chapters[active].image} alt="" className="about-preview__modern-image" /><div className="about-preview__modern-image-meta"><span>{chapter.tag}</span><span>YOURTECH®</span></div><div className="about-preview__modern-image-title">{chapter.title}</div></div><div className="about-preview__modern-controls"><button type="button" onClick={() => move(ar ? 1 : -1)} aria-label={copy.next}><ArrowLeft size={18} /></button><button type="button" onClick={() => move(ar ? -1 : 1)} aria-label={copy.next}><ArrowRight size={18} /></button></div></div>
        </div>
        <footer className="about-preview__modern-footer"><div className="about-preview__modern-dots">{chapters.map((item, index) => <button key={item.en.tag} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`${copy.next} ${index + 1}`} />)}</div><span>{copy.next}</span><span>STRATEGY / DESIGN / ENGINEERING</span></footer>
      </div>
    </section>
  );
}
