import { useRef, useState, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { TbMenu3 } from "react-icons/tb";

const navLinks = [
  { num: "01", label: "Home",            href: "#hero",              img: "/who-we-are.webp",              caption: "Where Vision Begins"        },
  { num: "02", label: "Vision",          href: "#vision",            img: "/vision-mission-values.webp",   caption: "Purpose. Values. Direction." },
  { num: "03", label: "Core Principles", href: "#portfolio",         img: "/what-we-do.webp",              caption: "What Defines Us"             },
  { num: "04", label: "Build & Develop", href: "#build-and-develop", img: "/building-ibm-upscale.webp",    caption: "From Foundation to Skyline"  },
  { num: "05", label: "Advisory",        href: "#advisory",          img: "/our-approach.webp",            caption: "Expert Guidance"             },
  { num: "06", label: "Contact",         href: "#contact",           img: "/Homepage.webp",                caption: "Let's Build Together"        },
];

// ── Live clock ──────────────────────────────────────────────────────────────
const useClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

// ── Component ────────────────────────────────────────────────────────────────
const Navbar = forwardRef(function Navbar(_, logoRef) {
  const [isOpen, setIsOpen]         = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const overlayRef   = useRef(null);
  const menuBtnRef   = useRef(null);
  const closeBtnRef  = useRef(null);
  const linkRefs     = useRef([]);
  const metaRef      = useRef(null);
  const rightPanelRef= useRef(null);
  const previewRefs  = useRef([]);
  const tlRef        = useRef(null);

  const time = useClock();

  /* ── get button origin for clip-path ── */
  const getOrigin = () => {
    const btn = menuBtnRef.current;
    if (!btn) return "calc(100% - 48px) 48px";
    const rect = btn.getBoundingClientRect();
    return `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
  };

  /* ── image preview swap on hover ── */
  const handleLinkEnter = (i) => {
    setHoveredIdx(i);
    previewRefs.current.forEach((el, idx) => {
      if (!el) return;
      gsap.to(el, {
        opacity: idx === i ? 1 : 0,
        scale:   idx === i ? 1 : 1.04,
        duration: 0.45,
        ease: "power2.out",
      });
    });
  };

  const handleLinkLeave = () => {
    setHoveredIdx(null);
    previewRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, { opacity: 0, scale: 1.04, duration: 0.35, ease: "power2.in" });
    });
    // show default (first) image dimly
    if (previewRefs.current[0]) {
      gsap.to(previewRefs.current[0], { opacity: 0.3, scale: 1, duration: 0.45, ease: "power2.out" });
    }
  };

  /* ── open ── */
  const openMenu = () => {
    if (tlRef.current) tlRef.current.kill();
    setIsOpen(true);
    const origin = getOrigin();

    // reset default preview
    if (previewRefs.current[0]) {
      gsap.set(previewRefs.current[0], { opacity: 0.3, scale: 1 });
    }
    previewRefs.current.slice(1).forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, scale: 1.04 });
    });

    tlRef.current = gsap
      .timeline()
      .set(overlayRef.current, { clipPath: `circle(0px at ${origin})`, pointerEvents: "auto" })
      .to(overlayRef.current, { clipPath: `circle(200vmax at ${origin})`, duration: 0.85, ease: "power4.inOut" })
      .fromTo(closeBtnRef.current,   { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.1")
      .fromTo(linkRefs.current,      { y: 70, opacity: 0 },       { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power3.out" }, "-=0.25")
      .fromTo(rightPanelRef.current, { x: 40, opacity: 0 },       { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5")
      .fromTo(metaRef.current,       { y: 20, opacity: 0 },       { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3");
  };

  /* ── close ── */
  const closeMenu = (href) => {
    const origin = getOrigin();
    gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setHoveredIdx(null);
        if (href && href !== "#") {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }
      },
    })
      .to([...linkRefs.current].reverse(), { y: -40, opacity: 0, duration: 0.22, stagger: 0.04, ease: "power2.in" })
      .to(rightPanelRef.current, { x: 30, opacity: 0, duration: 0.2 }, "<")
      .to(metaRef.current, { opacity: 0, duration: 0.15 }, "<")
      .to(closeBtnRef.current, { opacity: 0, scale: 0.5, duration: 0.2 }, "<")
      .to(overlayRef.current, {
        clipPath: `circle(0px at ${origin})`,
        duration: 0.75,
        ease: "power4.inOut",
        onComplete: () => gsap.set(overlayRef.current, { pointerEvents: "none" }),
      }, "-=0.05");
  };

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="nav-bg absolute inset-0 bg-transparent opacity-0 pointer-events-none" />
        <div className="px-5 sm:px-8 py-6 flex justify-between items-center w-full relative z-10">
          <a href="#" ref={logoRef}
            className="text-[1.2rem] sm:text-2xl font-medium tracking-tighter sm:tracking-tight opacity-0 select-none">
            EVERCROWN
          </a>
          <button ref={menuBtnRef} onClick={openMenu} aria-label="Open navigation"
            className="nav-items w-10 h-10 flex items-center justify-center text-2xl sm:text-3xl text-white/80 hover:text-white transition-colors duration-300 focus:outline-none">
            <TbMenu3 />
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay ───────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        style={{ clipPath: "circle(0px at calc(100% - 48px) 48px)", pointerEvents: "none" }}
        className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col overflow-hidden"
      >
        {/* Noise */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")" }}
        />

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-800/15 rounded-full blur-[180px] pointer-events-none" />

        {/* ── Top bar inside overlay ── */}
        <div className="flex items-center justify-between px-8 sm:px-12 pt-6 sm:pt-7 shrink-0">
          <span className="text-[1.2rem] sm:text-2xl font-medium tracking-tighter text-white/20 select-none">
            EVERCROWN
          </span>

          {/* Live clock */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3]/60 animate-pulse" />
            <span className="technical-monoscope text-white/30">{time} IST</span>
          </div>

          {/* Close button */}
          <button ref={closeBtnRef} onClick={() => closeMenu(null)} aria-label="Close navigation"
            className="group w-11 h-11 flex items-center justify-center border border-white/15 rounded-full hover:border-[#E5D3B3]/50 transition-colors duration-300 focus:outline-none">
            <svg className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Main content — two columns on desktop ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* LEFT — Nav links */}
          <div className="flex flex-col justify-center px-8 sm:px-12 py-8 w-full lg:w-[55%] xl:w-1/2">

            {/* Section label */}
            <div className="technical-monoscope text-white/20 mb-8 flex items-center gap-3">
              <span>NAVIGATE</span>
              <div className="flex-1 h-px bg-white/10 max-w-[60px]" />
              <span>0{navLinks.length} SECTIONS</span>
            </div>

            <nav aria-label="Site navigation" className="flex flex-col">
              {navLinks.map((link, i) => (
                <a
                  key={link.num}
                  href={link.href}
                  ref={(el) => (linkRefs.current[i] = el)}
                  onClick={(e) => { e.preventDefault(); closeMenu(link.href); }}
                  onMouseEnter={() => handleLinkEnter(i)}
                  onMouseLeave={handleLinkLeave}
                  className="group relative flex items-center gap-5 sm:gap-7 py-3 sm:py-4 border-b border-white/[0.06] hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <span className="technical-monoscope text-white/25 group-hover:text-[#E5D3B3]/70 transition-colors duration-300 w-6 shrink-0 relative z-10">
                    {link.num}
                  </span>

                  <span className="title-serif text-[clamp(1.9rem,4vw,4.2rem)] leading-none text-white/75 group-hover:text-white transition-colors duration-300 tracking-tight relative z-10">
                    {link.label}
                  </span>

                  {/* Animated caption on hover */}
                  <span className="ml-auto hidden sm:block technical-monoscope text-white/0 group-hover:text-[#E5D3B3]/50 transition-colors duration-300 text-right max-w-[140px] relative z-10 leading-relaxed">
                    {link.caption}
                  </span>

                  {/* Arrow */}
                  <div className="shrink-0 relative z-10 flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-350 sm:ml-2">
                    <svg className="w-3 h-3 text-[#E5D3B3]/50" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT — Image preview (desktop only) */}
          <div ref={rightPanelRef}
            className="hidden lg:flex lg:w-[45%] xl:w-1/2 flex-col relative overflow-hidden border-l border-white/[0.06]">

            {/* Image stack */}
            {navLinks.map((link, i) => (
              <img
                key={link.num}
                ref={(el) => (previewRefs.current[i] = el)}
                src={link.img}
                alt={link.label}
                loading="lazy"
                decoding="async"
                style={{ opacity: i === 0 ? 0.3 : 0 }}
                className="absolute inset-0 w-full h-full object-cover scale-[1.04] transition-none select-none pointer-events-none"
              />
            ))}

            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 to-transparent z-10" />

            {/* Decorative blueprint SVG */}
            <div className="absolute top-6 right-6 z-20 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="59" stroke="white" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="60" cy="60" r="20" stroke="white" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="2" fill="white" />
                <line x1="60" y1="0" x2="60" y2="120" stroke="white" strokeWidth="0.3" opacity="0.5"/>
                <line x1="0" y1="60" x2="120" y2="60" stroke="white" strokeWidth="0.3" opacity="0.5"/>
                <line x1="18" y1="18" x2="102" y2="102" stroke="white" strokeWidth="0.3" opacity="0.3" strokeDasharray="2 4"/>
                <line x1="102" y1="18" x2="18" y2="102" stroke="white" strokeWidth="0.3" opacity="0.3" strokeDasharray="2 4"/>
              </svg>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
              <div className="technical-monoscope text-white/30 mb-3 flex items-center gap-3">
                <span className="text-[#E5D3B3]/50">◎</span>
                <span>19° 4' 8&quot; N / 72° 52' 29&quot; E</span>
              </div>
              <p className="title-serif italic text-[clamp(1.2rem,2vw,1.8rem)] text-white/40 leading-snug max-w-xs">
                "Building tomorrow's landmarks, today."
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom meta row ── */}
        <div ref={metaRef}
          className="px-8 sm:px-12 pb-7 sm:pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.06] pt-5 shrink-0">

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <a href="mailto:hello@evercrown.in"
              className="technical-monoscope text-white/30 hover:text-white/60 transition-colors duration-300 flex items-center gap-2">
              <span className="text-[#E5D3B3]/40">✉</span>
              hello@evercrown.in
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <a href="tel:+919876543210"
              className="technical-monoscope text-white/30 hover:text-white/60 transition-colors duration-300 flex items-center gap-2">
              <span className="text-[#E5D3B3]/40">✆</span>
              +91 98765 43210
            </a>
          </div>

          {/* Right side — social + copyright */}
          <div className="flex items-center gap-6">
            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { label: "IN", href: "#" },
                { label: "LI", href: "#" },
                { label: "YT", href: "#" },
              ].map(({ label, href }) => (
                <a key={label} href={href}
                  className="technical-monoscope text-white/20 hover:text-[#E5D3B3]/60 transition-colors duration-300">
                  {label}
                </a>
              ))}
            </div>
            <span className="w-px h-4 bg-white/10 hidden sm:block" />
            <p className="technical-monoscope text-white/15 hidden sm:block">
              © {new Date().getFullYear()} EVERCROWN
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;
