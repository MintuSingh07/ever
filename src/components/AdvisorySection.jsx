import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Land Acquisition & Feasibility",
    desc: "Strategic site assessment, zoning compliance analysis, legal due diligence, and ROI modelling before a single rupee is committed.",
    coord: "28° 36' 50\" N / 77° 12' 32\" E",
  },
  {
    num: "02",
    title: "Project Planning & Design Advisory",
    desc: "End-to-end coordination between architects, structural engineers, and regulators. We translate vision into executable blueprints.",
    coord: "19° 4' 8\" N / 72° 52' 29\" E",
  },
  {
    num: "03",
    title: "Construction Management",
    desc: "On-site supervision, vendor management, quality audits, and milestone tracking — ensuring on-time, on-budget delivery.",
    coord: "12° 58' 16\" N / 77° 35' 28\" E",
  },
  {
    num: "04",
    title: "Investment & Portfolio Strategy",
    desc: "Data-driven advisory on asset allocation, redevelopment potential, and long-term value maximisation for investors and landowners.",
    coord: "23° 1' 19\" N / 72° 34' 48\" E",
  },
];

const AdvisorySection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Heading reveal
      gsap.from(".advisory-heading", {
        scrollTrigger: {
          trigger: "#advisory",
          start: "top 75%",
          once: true, // Fire once — no reverse on mobile
        },
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
      });

      // Subtext reveal
      gsap.from(".advisory-subtext", {
        scrollTrigger: {
          trigger: "#advisory",
          start: "top 65%",
          once: true, // Fire once — no reverse on mobile
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "expo.out",
      });

      // Service items stagger
      gsap.from(".advisory-item", {
        scrollTrigger: {
          trigger: ".advisory-grid",
          start: "top 80%",
          once: true, // Fire once — no reverse on mobile
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Divider line grow
      gsap.from(".advisory-divider", {
        scrollTrigger: {
          trigger: "#advisory",
          start: "top 70%",
          once: true, // Fire once — no reverse on mobile
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.6,
        ease: "expo.out",
      });

      // CTA button
      gsap.from(".advisory-cta", {
        scrollTrigger: {
          trigger: ".advisory-grid",
          start: "bottom 90%",
          once: true, // Fire once — no reverse on mobile
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="advisory"
      ref={sectionRef}
      className="relative w-full bg-[#080808] z-40 overflow-hidden py-28 md:py-40 px-8 md:px-24"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-900/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-800/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Architectural background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="advisory-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#advisory-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <div className="technical-monoscope text-[#E5D3B3]/60 mb-6 flex items-center gap-4">
            <span>06 // ADVISORY</span>
            <div className="scale-bar w-16" />
            <span className="opacity-60">CONSULTANCY_SERVICES</span>
          </div>

          <div className="advisory-divider w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent mb-10" />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="advisory-heading title-serif text-[clamp(3rem,6vw,6rem)] leading-none tracking-tight">
              <span className="premium-text-silver">Expert Guidance.</span>
              <br />
              <span className="architect-outline text-[clamp(3rem,6vw,6rem)]">Decisive Results.</span>
            </h2>
            <p className="advisory-subtext text-stone-400 text-sm leading-relaxed max-w-sm tracking-wide md:text-right">
              We act as your strategic partner from concept to completion — combining deep market intelligence with hands-on operational expertise.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="advisory-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="advisory-item group relative bg-[#080808] p-10 md:p-12 hover:bg-[#0f0f0f] transition-colors duration-500 overflow-hidden"
            >
              {/* Corner brackets on hover */}
              <div className="corner-bracket bracket-tl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="corner-bracket bracket-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover accent line */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#E5D3B3]/60 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

              <div className="technical-monoscope text-white/30 mb-6 flex items-center gap-4">
                <span className="text-[#E5D3B3]/70 group-hover:text-[#E5D3B3] transition-colors duration-300">{svc.num}</span>
                <div className="scale-bar w-8 opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="opacity-50">{svc.coord}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-light tracking-tight text-white/90 group-hover:text-white mb-4 transition-colors duration-300 leading-snug">
                {svc.title}
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed tracking-wide group-hover:text-stone-400 transition-colors duration-300">
                {svc.desc}
              </p>

              {/* Arrow indicator */}
              <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0">
                <span className="technical-monoscope text-[#E5D3B3]/80 text-[0.55rem]">ENQUIRE</span>
                <svg className="w-8 h-px" viewBox="0 0 32 1" fill="none">
                  <line x1="0" y1="0.5" x2="28" y2="0.5" stroke="#E5D3B3" strokeOpacity="0.6" />
                  <path d="M26 -2L30 0.5L26 3" stroke="#E5D3B3" strokeOpacity="0.6" strokeWidth="0.8" fill="none" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="advisory-cta mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-white/5">
          <p className="technical-monoscope text-white/30 text-[0.55rem]">
            ALL ADVISORY ENGAGEMENTS ARE SUBJECT TO AN INITIAL DISCOVERY CALL.
          </p>
          <a
            href="#contact"
            className="group flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
          >
            <span>Begin a Conversation</span>
            <div className="w-10 h-px bg-white/30 group-hover:w-16 group-hover:bg-white/60 transition-all duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdvisorySection;
