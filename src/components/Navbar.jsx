import { useRef, useState, forwardRef } from "react";
import gsap from "gsap";
import { TbMenu3 } from "react-icons/tb";

const navLinks = [
  { num: "01", label: "Home",            href: "#hero" },
  { num: "02", label: "Vision",          href: "#vision" },
  { num: "03", label: "Core Principles", href: "#portfolio" },
  { num: "04", label: "Build & Develop", href: "#build-and-develop" },
  { num: "05", label: "Advisory",        href: "#advisory" },
  { num: "06", label: "Contact",         href: "#contact" },
];

// logoRef is forwarded from App.jsx so the intro GSAP animation still targets it
const Navbar = forwardRef(function Navbar(_, logoRef) {
  const [isOpen, setIsOpen]   = useState(false);
  const overlayRef            = useRef(null);
  const menuBtnRef            = useRef(null);
  const closeBtnRef           = useRef(null);
  const linkRefs              = useRef([]);
  const metaRef               = useRef(null);
  const tlRef                 = useRef(null);

  /* ── helpers ── */
  const getOrigin = () => {
    const btn  = menuBtnRef.current;
    if (!btn) return "calc(100% - 48px) 48px";
    const rect = btn.getBoundingClientRect();
    return `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
  };

  /* ── open ── */
  const openMenu = () => {
    // Kill any in-progress timeline to avoid state conflicts
    if (tlRef.current) tlRef.current.kill();
    setIsOpen(true);
    const origin = getOrigin();

    tlRef.current = gsap
      .timeline()
      // 1. reset & position overlay
      .set(overlayRef.current, {
        clipPath: `circle(0px at ${origin})`,
        pointerEvents: "auto",
      })
      // 2. expand circle to cover screen
      .to(overlayRef.current, {
        clipPath: `circle(200vmax at ${origin})`,
        duration: 0.85,
        ease: "power4.inOut",
      })
      // 3. close button — fromTo so it's always correct regardless of prior state
      .fromTo(
        closeBtnRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
        "-=0.1"
      )
      // 4. stagger in nav links — fromTo avoids reading stale opacity/y from close animation
      .fromTo(
        linkRefs.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power3.out" },
        "-=0.25"
      )
      // 5. meta row
      .fromTo(
        metaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );
  };

  /* ── close ── */
  const closeMenu = (href) => {
    const origin = getOrigin();

    gsap
      .timeline({
        onComplete: () => {
          setIsOpen(false);
          // Navigate after overlay is gone
          if (href && href !== "#") {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }
        },
      })
      // exit links fast
      .to([...linkRefs.current].reverse(), {
        y: -40,
        opacity: 0,
        duration: 0.22,
        stagger: 0.04,
        ease: "power2.in",
      })
      .to(metaRef.current, { opacity: 0, duration: 0.15 }, "<")
      .to(closeBtnRef.current, { opacity: 0, scale: 0.5, duration: 0.2 }, "<")
      // collapse circle
      .to(overlayRef.current, {
        clipPath: `circle(0px at ${origin})`,
        duration: 0.75,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        },
      }, "-=0.05");
  };

  return (
    <>
      {/* ── Top bar ── */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="nav-bg absolute inset-0 bg-transparent opacity-0 pointer-events-none" />
        <div className="px-5 sm:px-8 py-6 flex justify-between items-center w-full relative z-10">
          <a
            href="#"
            ref={logoRef}
            className="text-[1.2rem] sm:text-2xl font-medium tracking-tighter sm:tracking-tight opacity-0 select-none"
          >
            EVERCROWN
          </a>

          <button
            ref={menuBtnRef}
            onClick={openMenu}
            aria-label="Open navigation"
            className="nav-items w-10 h-10 flex items-center justify-center text-2xl sm:text-3xl text-white/80 hover:text-white transition-colors duration-300 focus:outline-none"
          >
            <TbMenu3 />
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay ── */}
      <div
        ref={overlayRef}
        style={{
          clipPath: "circle(0px at calc(100% - 48px) 48px)",
          pointerEvents: "none",
        }}
        className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col overflow-hidden"
      >
        {/* Noise texture (matches site-wide aesthetic) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Ambient glow — top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[180px] pointer-events-none" />

        {/* ── Close button (same corner as menu icon) ── */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-8 z-10">
          <button
            ref={closeBtnRef}
            onClick={() => closeMenu(null)}
            aria-label="Close navigation"
            className="group w-11 h-11 flex items-center justify-center border border-white/15 rounded-full hover:border-white/40 transition-colors duration-300 focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Logo inside overlay ── */}
        <div className="px-8 sm:px-16 pt-7 sm:pt-8">
          <span className="text-[1.2rem] sm:text-2xl font-medium tracking-tighter text-white/30 select-none">
            EVERCROWN
          </span>
        </div>

        {/* ── Nav links ── */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 pb-8">
          <nav aria-label="Site navigation" className="flex flex-col gap-0">
            {navLinks.map((link, i) => (
              <a
                key={link.num}
                href={link.href}
                ref={(el) => (linkRefs.current[i] = el)}
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu(link.href);
                }}
                className="group relative flex items-center gap-5 sm:gap-8 py-4 sm:py-5 border-b border-white/5 hover:border-white/15 transition-colors duration-300 overflow-hidden"
              >
                {/* Hover fill */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-0 transition-all duration-500 ease-out" />

                <span className="technical-monoscope text-[#E5D3B3]/40 group-hover:text-[#E5D3B3]/70 transition-colors duration-300 w-6 shrink-0 relative">
                  {link.num}
                </span>

                <span className="title-serif text-[clamp(2.2rem,5vw,5rem)] leading-none text-white/80 group-hover:text-white transition-colors duration-400 tracking-tight relative">
                  {link.label}
                </span>

                {/* Arrow that slides in on hover */}
                <div className="ml-auto relative flex items-center gap-2 opacity-0 translate-x-[-12px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                  <div className="w-6 h-px bg-[#E5D3B3]/50" />
                  <svg className="w-2.5 h-2.5 text-[#E5D3B3]/50" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5H9M6 2L9 5L6 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            ))}
          </nav>
        </div>

        {/* ── Bottom meta row ── */}
        <div
          ref={metaRef}
          className="px-8 sm:px-16 pb-8 sm:pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-white/5 pt-6"
        >
          <div className="flex flex-col gap-2">
            <a
              href="mailto:hello@evercrown.in"
              className="technical-monoscope text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              hello@evercrown.in
            </a>
            <a
              href="tel:+919876543210"
              className="technical-monoscope text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              +91 98765 43210
            </a>
          </div>
          <p className="technical-monoscope text-white/15">
            © {new Date().getFullYear()} EVERCROWN CONSTRUCTIONS PVT. LTD.
          </p>
        </div>
      </div>
    </>
  );
});

export default Navbar;
