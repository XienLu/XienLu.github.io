import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight, Search } from "lucide-react";

// --- Types ---
type Language = 'en' | 'zh';

interface Project {
  id: number;
  title: { en: string; zh: string };
  location: { en: string; zh: string };
  category: { en: string; zh: string };
  year: string;
  image: string;
}

// --- Translations ---
const translations = {
  en: {
    nav: ["Projects", "About", "News", "Careers", "Contact"],
    heroTitle: "Architecture for",
    heroSubtitle: "Humanity",
    heroDesc: "J.J. Pan and Partners, Architects and Planners",
    projectsTitle: "Projects",
    viewAll: "View All Projects",
    aboutTitle: "About JJP",
    aboutHeading: "A legacy of excellence spanning four decades.",
    aboutDesc: "Founded in 1981, J.J. Pan and Partners is a multi-disciplinary architectural firm dedicated to providing professional services that are both creative and technically sound.",
    yearsExp: "Years of Experience",
    awardsWon: "Awards Won",
    ourStory: "Our Story",
    quote: "Architecture is a social art that shapes the environment and influences the quality of life.",
    founder: "Joshua J. Pan",
    newsTitle: "News & Insights",
    newsViewAll: "View All",
    footerDesc: "Dedicated to creating architecture that enriches the human spirit and respects the environment.",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerFollow: "Follow Us",
    footerRights: "© 2024 J.J. Pan and Partners. All Rights Reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    categories: ["All", "Office", "Industrial", "Educational", "Cultural", "Residential", "Healthcare"]
  },
  zh: {
    nav: ["作品專案", "關於我們", "最新消息", "加入我們", "聯絡我們"],
    heroTitle: "為",
    heroSubtitle: "人性而築",
    heroDesc: "潘冀聯合建築師事務所",
    projectsTitle: "作品專案",
    viewAll: "查看所有作品",
    aboutTitle: "關於 JJP",
    aboutHeading: "四十載卓越傳承，鑄就經典。",
    aboutDesc: "潘冀聯合建築師事務所創立於 1981 年，是一家多元化的建築設計事務所，致力於提供兼具創意與技術實力的專業服務。",
    yearsExp: "年專業經驗",
    awardsWon: "項國際大獎",
    ourStory: "品牌故事",
    quote: "建築是一門社會藝術，它形塑環境並影響生活品質。",
    founder: "潘冀",
    newsTitle: "最新消息與洞察",
    newsViewAll: "查看全部",
    footerDesc: "致力於創造豐富人類精神並尊重環境的建築。",
    footerNav: "導覽",
    footerContact: "聯絡資訊",
    footerFollow: "關注我們",
    footerRights: "© 2024 潘冀聯合建築師事務所。版權所有。",
    privacy: "隱私權政策",
    terms: "使用條款",
    categories: ["全部", "辦公", "工業", "教育", "文化", "住宅", "醫療"]
  }
};

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: { en: "TSMC F18P1 Fab & Office", zh: "台積電 F18P1 廠房與辦公室" },
    location: { en: "Tainan, Taiwan", zh: "台灣，台南" },
    category: { en: "Industrial", zh: "工業" },
    year: "2020",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: { en: "National Chiao Tung University Library", zh: "國立交通大學圖書館" },
    location: { en: "Hsinchu, Taiwan", zh: "台灣，新竹" },
    category: { en: "Educational", zh: "教育" },
    year: "2018",
    image: "https://images.unsplash.com/photo-1503387762-592dee58292b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: { en: "Delta Electronics Headquarters", zh: "台達電子總部大樓" },
    location: { en: "Taipei, Taiwan", zh: "台灣，台北" },
    category: { en: "Office", zh: "辦公" },
    year: "2021",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 4,
    title: { en: "Tainan Public Library", zh: "台南市立圖書館總館" },
    location: { en: "Tainan, Taiwan", zh: "台灣，台南" },
    category: { en: "Cultural", zh: "文化" },
    year: "2021",
    image: "https://images.unsplash.com/photo-1518005020251-58296b97b1bb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: { en: "Nangang Software Park Phase III", zh: "南港軟體園區三期" },
    location: { en: "Taipei, Taiwan", zh: "台灣，台北" },
    category: { en: "Industrial", zh: "工業" },
    year: "2015",
    image: "https://images.unsplash.com/photo-1449156059344-23211f0da4af?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: { en: "Hsinchu Biomedical Science Park", zh: "新竹生物醫學園區" },
    location: { en: "Hsinchu, Taiwan", zh: "台灣，新竹" },
    category: { en: "Healthcare", zh: "醫療" },
    year: "2019",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2021&auto=format&fit=crop"
  }
];

const NEWS = [
  { date: "2024.03.15", title: { en: "JJP Wins International Design Award for Tainan Public Library", zh: "JJP 榮獲台南市立圖書館國際設計大獎" }, category: { en: "Awards", zh: "獎項" } },
  { date: "2024.02.28", title: { en: "Sustainable Architecture: A New Paradigm for Industrial Buildings", zh: "永續建築：工業建築的新典範" }, category: { en: "Insights", zh: "洞察" } },
  { date: "2024.01.10", title: { en: "JJP Appoints New Partners to Lead Global Expansion", zh: "JJP 任命新合夥人領導全球擴張" }, category: { en: "Corporate", zh: "企業" } }
];

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? "bg-white py-3 border-neutral-200" : "bg-transparent py-6 border-transparent"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <a href="#" className="text-xl font-bold tracking-[0.2em] uppercase">
            JJP <span className="font-light text-neutral-400">{lang === 'en' ? 'Architects' : '建築師'}</span>
          </a>
          
          <div className="hidden lg:flex space-x-8">
            {t.nav.map((item) => (
              <a key={item} href={`#${item}`} className="text-[13px] uppercase tracking-widest font-medium hover:text-neutral-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-4 text-[12px] tracking-widest font-bold">
            <button 
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-black' : 'text-neutral-300 hover:text-neutral-400'}`}
            >
              EN
            </button>
            <span className="text-neutral-300">|</span>
            <button 
              onClick={() => setLang('zh')}
              className={`transition-colors ${lang === 'zh' ? 'text-black' : 'text-neutral-300 hover:text-neutral-400'}`}
            >
              繁中
            </button>
          </div>
          <button className="hover:text-neutral-400 transition-colors">
            <Search size={18} />
          </button>
          <button onClick={() => setIsOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold tracking-[0.2em]">JJP</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {t.nav.map((item) => (
                <a 
                  key={item} 
                  href={`#${item}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-light tracking-tight hover:pl-4 transition-all"
                >
                  {item}
                </a>
              ))}
              <div className="flex space-x-4 pt-8 text-sm font-bold tracking-widest">
                <button onClick={() => { setLang('en'); setIsOpen(false); }} className={lang === 'en' ? 'text-black' : 'text-neutral-300'}>EN</button>
                <span className="text-neutral-300">|</span>
                <button onClick={() => { setLang('zh'); setIsOpen(false); }} className={lang === 'zh' ? 'text-black' : 'text-neutral-300'}>繁中</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[lang];
  const heroImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503387762-592dee58292b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={heroImages[currentIndex]} 
            className="w-full h-full object-cover"
            alt="Hero"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-20 left-0 w-full">
        <div className="container mx-auto px-6 flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 leading-tight">
              {t.heroTitle} <br />
              <span className="font-bold">{t.heroSubtitle}</span>
            </h1>
            <p className="text-lg opacity-80 font-light tracking-wide">
              {t.heroDesc}
            </p>
          </motion.div>
          
          <div className="flex space-x-2">
            {heroImages.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 transition-all duration-500 ${currentIndex === i ? "w-12 bg-white" : "w-4 bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectGrid = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const [activeCategory, setActiveCategory] = useState(t.categories[0]);

  // Reset active category when language changes
  useEffect(() => {
    setActiveCategory(t.categories[0]);
  }, [lang]);

  const filteredProjects = activeCategory === t.categories[0]
    ? PROJECTS 
    : PROJECTS.filter(p => p.category[lang] === activeCategory || p.category['en'] === activeCategory || p.category['zh'] === activeCategory);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 border-b border-neutral-100 pb-8">
          <h2 className="text-3xl font-light tracking-tight mb-6 md:mb-0">{t.projectsTitle}</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {t.categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`text-[12px] uppercase tracking-widest font-bold transition-all ${activeCategory === cat ? "text-black" : "text-neutral-300 hover:text-neutral-500"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-neutral-100">
                <img 
                  src={project.image} 
                  alt={project.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  <span>{project.category[lang]}</span>
                  <span>/</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="text-xl font-medium tracking-tight group-hover:text-neutral-500 transition-colors">
                  {project.title[lang]}
                </h3>
                <p className="text-sm text-neutral-400 font-light">{project.location[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-10 py-4 border border-neutral-200 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all">
            {t.viewAll}
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section id="about" className="py-32 bg-neutral-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-neutral-400">{t.aboutTitle}</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              {t.aboutHeading}
            </h2>
            <p className="text-lg text-neutral-500 font-light leading-relaxed max-w-xl">
              {t.aboutDesc}
            </p>
            <div className="flex space-x-12 pt-4">
              <div>
                <p className="text-4xl font-bold mb-1">40+</p>
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">{t.yearsExp}</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-1">200+</p>
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">{t.awardsWon}</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 text-[12px] uppercase tracking-[0.2em] font-bold group">
              <span>{t.ourStory}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" 
              alt="Office"
              className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white p-8 hidden md:block shadow-sm">
              <p className="text-sm font-light italic leading-relaxed text-neutral-500">
                "{t.quote}"
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest font-bold">— {t.founder}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section id="news" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl font-light tracking-tight">{t.newsTitle}</h2>
          <button className="text-[11px] uppercase tracking-widest font-bold border-b border-black pb-1">{t.newsViewAll}</button>
        </div>
        <div className="divide-y divide-neutral-100">
          {NEWS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-8 flex flex-col md:flex-row md:items-center group cursor-pointer"
            >
              <div className="w-32 text-[12px] font-bold text-neutral-300 mb-2 md:mb-0">{item.date}</div>
              <div className="flex-1 text-xl font-medium tracking-tight group-hover:text-neutral-400 transition-colors">{item.title[lang]}</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 border border-neutral-200 px-3 py-1 rounded-full mt-4 md:mt-0 md:ml-8">
                {item.category[lang]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-bold tracking-[0.2em] mb-8">JJP</h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              {t.footerDesc}
            </p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-500 mb-8">{t.footerNav}</h4>
            <ul className="space-y-4 text-sm font-light text-neutral-300">
              {t.nav.map((item) => (
                <li key={item}><a href={`#${item}`} className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-500 mb-8">{t.footerContact}</h4>
            <ul className="space-y-4 text-sm font-light text-neutral-300">
              <li>Taipei Office: +886 2 2701 2671</li>
              <li>Hsinchu Office: +886 3 571 2671</li>
              <li>Email: info@jjpan.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-500 mb-8">{t.footerFollow}</h4>
            <div className="flex space-x-6">
              {["FB", "IG", "LI"].map(s => (
                <a key={s} href="#" className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center text-xs font-bold hover:bg-white hover:text-black transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-neutral-800 gap-6">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500">
            {t.footerRights}
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('zh');

  return (
    <div className="font-sans text-brand-black selection:bg-black selection:text-white">
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <ProjectGrid lang={lang} />
        <AboutSection lang={lang} />
        <NewsSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
