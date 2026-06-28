import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { TbMenu3 } from "react-icons/tb";
import { AmbientLights } from "./components/AmbientLights";
import LiquidMaskSection from "./components/LiquidMaskSection";
import AdvisorySection from "./components/AdvisorySection";
import ContactSection from "./components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const container = useRef();
  const loaderRef = useRef();
  const realLogoRef = useRef();
  const visionContentRef = useRef();
  const spotlightRef = useRef();
  const gridRef = useRef();

  useGSAP(
    () => {
      // Get final native position of the logo
      const finalRect = realLogoRef.current.getBoundingClientRect();

      // We want to put the logo exactly in the center of the screen initially.
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      // The final center of the logo is:
      const finalCenterX = finalRect.left + finalRect.width / 2;
      const finalCenterY = finalRect.top + finalRect.height / 2;

      // Offset to apply to move it to the viewport center:
      const centerOffsetX = viewportCenterX - finalCenterX;
      const centerOffsetY = viewportCenterY - finalCenterY;

      // Initial reveal timeline
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => initBuildingScroll(),
      });

      // Skip intro on first scroll/wheel
      const skipIntro = () => {
        if (tl.isActive()) {
          tl.progress(1);
          initBuildingScroll();
        }
        window.removeEventListener("wheel", skipIntro);
        window.removeEventListener("touchmove", skipIntro);
      };
      window.addEventListener("wheel", skipIntro);
      window.addEventListener("touchmove", skipIntro);

      // Initial state: perfectly centered on screen, scaled up, hidden
      gsap.set(realLogoRef.current, {
        x: centerOffsetX,
        y: centerOffsetY,
        scale: 3,
        opacity: 0,
      });

      // 1. Fade the logo in
      tl.to(realLogoRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      })
        // 2. Exact Logo sliding back to nav
        .to(realLogoRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.inOut",
          force3D: true,
        }) // immediate start after fade-in
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.6,
          ease: "expo.inOut",
          force3D: true,
        })
        .to(
          ".nav-bg",
          {
            opacity: 1,
            duration: 0.8,
            ease: "expo.inOut",
            force3D: true,
          },
          "<",
        )
        .to(
          ".hero-image",
          {
            y: 0,
            opacity: 1,
            duration: 2.8,
            ease: "expo.inOut",
            force3D: true,
          },
          "-=1.9",
        ) // Start immediately with loader
        .from(
          ".hero-text-block",
          {
            yPercent: 100,
            opacity: 0,
            duration: 2.6,
            ease: "expo.inOut",
            force3D: true,
          },
          "<+=.3",
        )
        .from(
          ".cloud-1",
          {
            xPercent: -50,
            opacity: 0,
            duration: 3,
            ease: "power2.out",
          },
          "<+=1.0",
        )
        .from(
          ".cloud-2",
          {
            xPercent: 50,
            opacity: 0,
            duration: 3.5,
            ease: "power2.out",
          },
          "<+=0.2",
        )
        .from(
          ".cloud-3",
          {
            xPercent: 50,
            opacity: 0,
            duration: 3.2,
            ease: "power2.out",
          },
          "<+=0.1",
        )
        .from(
          ".cloud-4",
          {
            xPercent: -50,
            opacity: 0,
            duration: 3.8,
            ease: "power2.out",
          },
          "<+=0.2",
        )
        .to(
          ".scroll-indicator",
          {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out",
          },
          ">-1.5",
        );

      // Continuous floating for clouds
      gsap.to(".cloud-1", {
        y: -30,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cloud-2", {
        y: 40,
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cloud-3", {
        y: -25,
        x: 20,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cloud-4", {
        y: 35,
        x: -25,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const initBuildingScroll = () => {
        // Prevent double initialization
        if (gsap.getById("building-scroll")) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
          // Desktop Settings
          gsap.to(".hero-image", {
            id: "building-scroll",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              endTrigger: "#vision",
              end: "top top",
              scrub: 0.5,
              immediateRender: false,
            },
            xPercent: -65,
            y: 0,
            scale: 1.5,
            filter: "grayscale(1)",
            WebkitFilter: "grayscale(1)",
          });
        });

        mm.add("(max-width: 768px)", () => {
          // Mobile Settings: Keep building in frame
          gsap.to(".hero-image", {
            id: "building-mobile",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              endTrigger: "#vision",
              end: "top top",
              scrub: 0.5,
              immediateRender: false,
            },
            xPercent: -30, // Less aggressive shift
            y: -80, // Move up to stay in view
            scale: 1.3, // Slightly smaller scale
            filter: "grayscale(1)",
            WebkitFilter: "grayscale(1)",
          });
        });

        // Hide scroll indicator on scroll
        gsap.to(".scroll-indicator", {
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom 20%",
            scrub: true,
          },
          opacity: 0,
          y: -20,
          pointerEvents: "none",
        });

        // 2. Hide Global Building as we enter deeper content
        gsap.to(".hero-image-container", {
          scrollTrigger: {
            trigger: "#portfolio",
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
          opacity: 0,
          pointerEvents: "none",
        });

        // 3. Pin Vision: Let Portfolio overlay it after a "hold" duration
        ScrollTrigger.create({
          trigger: "#vision",
          start: "top top",
          end: "+=250%", // Increased duration for cinematic "hold" time
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        // Vision Content Reveal
        gsap.from(".vision-detail-item", {
          scrollTrigger: {
            trigger: "#vision",
            start: "top 80%",
            once: true, // Fire once only — prevents reverse on mobile pinned sections
          },
          x: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.out",
        });


        // Vision Floating Effect
        gsap.to(".vision-detail-item", {
          y: -15,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // 3. Core Principles Animations (Section 3)
        const principles = gsap.utils.toArray(".principle-item");

        // Centerline growth & Bullet progress
        gsap.fromTo(
          ".principles-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: "#portfolio",
              start: "top 40%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );

        // Vertical Spark with Sync'd Spotlight and Parallax Grid
        gsap.fromTo(
          ".principles-spark-head",
          { top: "0%" },
          {
            top: "100%",
            scrollTrigger: {
              trigger: "#portfolio",
              start: "top 40%",
              end: "bottom 80%",
              scrub: true,
              onUpdate: (self) => {
                if (spotlightRef.current) {
                  spotlightRef.current.style.setProperty(
                    "--spark-y",
                    `${self.progress * 100}%`,
                  );
                }
                if (gridRef.current) {
                  gsap.set(gridRef.current, { y: -self.progress * 80 });
                }
              },
            },
          },
        );

        gsap.fromTo(
          ".principles-spark-tail",
          { height: 0, top: "0%" }, // Start collapsed
          {
            height: 150, // Length of the glowing trail
            top: "100%",
            scrollTrigger: {
              trigger: "#portfolio",
              start: "top 40%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );

        // Active Principle Highlight: Focus text as spark passes
        principles.forEach((item) => {
          const title = item.querySelector("h3");
          const detail = item.querySelector("p");

          gsap.fromTo(
            [title, detail],
            { y: 15 }, // Keep subtle movement
            {
              y: 0,
              color: "#ffffff",
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
                toggleActions: "play none none none",
                immediateRender: false,
              },
            },
          );
        });

        // Staggered reveals for each principle block
        principles.forEach((item) => {
          const text = item.querySelector(".principle-text");

          // Text and Technical Ornaments (Permanent)
          gsap.fromTo(
            [text, text.querySelector(".technical-monoscope")],
            { y: 20 },
            {
              y: 0,
              duration: 1.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
                toggleActions: "play none none none",
                immediateRender: false,
              },
            },
          );

          // Box and Brackets Reveal (Permanent)
          const brackets = item.querySelectorAll(".corner-bracket");
          const boxContainer = item.querySelector(".box-reveal-container");

          gsap.from(brackets, {
            scale: 1.2,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
              toggleActions: "play none none none",
            },
          });

          gsap.to(boxContainer, {
            height: "100%",
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
              toggleActions: "play none none none",
            },
          });

          // Scale bar growth
          const scaleBar = item.querySelector(".scale-bar");
          if (scaleBar) {
            gsap.from(scaleBar, {
              width: 0,
              duration: 1.5,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            });
          }
        });

        // Build & Develop Reveal Animation
        gsap.from("#build-and-develop h2, #build-and-develop p, #build-and-develop .technical-monoscope", {
          scrollTrigger: {
            trigger: "#build-and-develop",
            start: "top 70%",
            once: true, // Fire once only — prevents reverse hiding text on mobile
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        });

      };

      // Initialize Lenis
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Autoplay background video reliably on all browsers (including Brave/Safari)
      const bgVideo = container.current?.querySelector("#build-and-develop video");
      const playVideoOnInteraction = () => {
        if (bgVideo && bgVideo.paused) {
          bgVideo.play().catch(() => {});
        }
        window.removeEventListener("click", playVideoOnInteraction);
        window.removeEventListener("touchstart", playVideoOnInteraction);
        window.removeEventListener("scroll", playVideoOnInteraction);
      };

      if (bgVideo) {
        bgVideo.defaultMuted = true;
        bgVideo.muted = true;
        bgVideo.play().catch((err) => {
          console.warn("Video autoplay failed, retrying on user interaction:", err);
          window.addEventListener("click", playVideoOnInteraction);
          window.addEventListener("touchstart", playVideoOnInteraction);
          window.addEventListener("scroll", playVideoOnInteraction);
        });
      }

      // Refresh ScrollTrigger after mobile layout settles
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);

      // Preloader and Intro Animations
      return () => {
        window.removeEventListener("wheel", skipIntro);
        window.removeEventListener("touchmove", skipIntro);
        window.removeEventListener("click", playVideoOnInteraction);
        window.removeEventListener("touchstart", playVideoOnInteraction);
        window.removeEventListener("scroll", playVideoOnInteraction);
        lenis.destroy();
      };
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="bg-[#050505] text-white overflow-hidden min-h-screen"
    >
      <div className="fixed-noise-overlay" />
      {/* Loader Backdrop */}
      <div
        ref={loaderRef}
        className="loader-backdrop fixed inset-0 z-[45] bg-[#050505] pointer-events-none"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="nav-bg absolute inset-0 bg-transparent opacity-0 pointer-events-none" />
        <div className="px-5 sm:px-8 py-6 flex justify-between items-center w-full relative z-10">
          <a
            href="#"
            ref={realLogoRef}
            className="text-[1.2rem] sm:text-2xl font-medium tracking-tighter sm:tracking-tight opacity-0"
          >
            EVERCROWN
          </a>
          <button className="nav-items text-2xl sm:text-3xl hover:text-neutral-400 transition-colors">
            <TbMenu3 />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center pt-20 snap-start"
      >
        {/* Background Group (Clipped to Hero Height) */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute inset-0 w-full h-full bg-[url('/bg_mountain.webp')] bg-cover bg-bottom origin-bottom scale-[1.15]"></div>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
          <div className="absolute -bottom-[1px] left-0 w-full h-[30vh] md:h-[40vh] bg-gradient-to-t from-[#050505] to-transparent z-[10]"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center md:justify-start items-center pt-0 md:pt-32 select-none pointer-events-none z-[5] px-4 -translate-y-28 md:translate-y-0">
          <div className="overflow-hidden w-full">
            <div className="hero-text-block uppercase tracking-tighter leading-none text-center -mt-.5 w-full">
              <div className="text-[clamp(1.5rem,8vw,5rem)] font-medium premium-text-gradient">
                WE CONSTRUCT
              </div>
              <div className="text-[clamp(2.5rem,10vw,8rem)] font-semibold premium-text-gradient -mt-[.1em]">
                YOUR VISION
              </div>
            </div>
          </div>
        </div>

        {/* Clouds */}
        <img
          src="/cloude1.webp"
          alt="Atmospheric Cloud 1"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="cloud-1 absolute top-20 -left-1/4 w-[60%] h-auto mix-blend-screen opacity-40 z-[8] pointer-events-none"
        />
        <img
          src="/cloude2.webp"
          alt="Atmospheric Cloud 2"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="cloud-2 absolute bottom-20 -right-1/4 w-[50%] h-auto mix-blend-screen opacity-30 z-[15] pointer-events-none"
        />
        <img
          src="/cloude1.webp"
          alt="Atmospheric Cloud 3"
          loading="eager"
          decoding="async"
          className="cloud-3 absolute top-1/2 -right-1/4 w-[45%] h-auto mix-blend-screen opacity-20 z-[7] pointer-events-none -scale-x-100 rotate-12"
        />
        <img
          src="/cloude2.webp"
          alt="Atmospheric Cloud 4"
          loading="eager"
          decoding="async"
          className="cloud-4 absolute bottom-1/3 -left-1/4 w-[40%] h-auto mix-blend-screen opacity-25 z-[12] pointer-events-none rotate-[-15deg]"
        />
      </section>

      {/* Second Section (Pinned Vision) */}
      <section
        id="vision"
        className="relative h-screen w-full bg-[#050505] z-20 flex flex-col md:flex-row items-center justify-start md:justify-end pl-8 md:pl-24 pr-8 md:pr-12 pt-24 md:pt-0 overflow-hidden"
      >
        {/* Ambient Lighting */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

        <div
          ref={visionContentRef}
          className="max-w-4xl w-full text-center md:text-right pointer-events-none z-30 px-4 md:px-0"
        >
          <div className="vision-detail-item">
            <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] title-serif tracking-tight leading-none premium-text-silver italic">
              "TRANSFORMING PLOTS INTO FUTURE-READY LANDMARKS.
              <br className="hidden md:block" />
              ELEVATING LIVES THROUGH PRECISION AND VALUE."
            </h2>
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="relative min-h-[110vh] w-full z-40 px-8 md:px-24 py-24 flex flex-col items-center bg-[#1c1c1c] overflow-hidden"
      >
        {/* Environment Blending Masks (Top and Bottom) */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#050505] to-transparent z-[15] pointer-events-none" />
        <div className="absolute -bottom-[1px] left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-[15] pointer-events-none" />

        {/* Ambient Lighting */}
        <div className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-[1]" />
        <div className="absolute bottom-[10%] -right-[5%] w-[700px] h-[700px] bg-amber-800/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-[1]" />

        {/* Decorative Foundations */}
        <div
          ref={gridRef}
          className="principles-line::after absolute inset-0 opacity-10 pointer-events-none"
        />
        <div ref={spotlightRef} className="spotlight-overlay" />

        {/* Hero Heading for Section 3 */}
        <div className="w-full max-w-7xl text-center mb-16 md:mb-20 relative z-10 px-4">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.8rem)] title-serif tracking-normal md:tracking-tight uppercase leading-snug md:leading-none opacity-90 md:whitespace-nowrap flex justify-center">
            <span className="premium-text-silver">
              Architecting The Future Through Core Principles
            </span>
          </h2>
        </div>

        <div className="w-full max-w-7xl relative flex flex-col gap-12 md:gap-16">
          {/* Vertical Centerline with Glowing Tail Spark */}
          <div className="principles-line hidden md:block">
            <div className="principles-spark-tail" />
            <div className="principles-spark-head" />
          </div>

          {/* Principle 1: WHO WE ARE */}
          <div className="principle-item mt-12 md:mt-24 lg:mt-32 relative flex flex-col-reverse md:flex-row w-full items-center gap-8 md:gap-16 lg:gap-24">
            <div className="box-reveal-wrapper w-full max-w-lg aspect-video relative mx-auto md:ml-auto md:mr-0 md:flex-1">
              <div className="corner-bracket bracket-tl" />
              <div className="corner-bracket bracket-tr" />
              <div className="corner-bracket bracket-bl" />
              <div className="corner-bracket bracket-br" />
              <div className="box-reveal-container w-full bg-black/90 relative border border-white/10">
                <img
                  src="/who-we-are.webp"
                  alt="Who We Are"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover opacity-85 select-none pointer-events-none"
                />
                <div className="absolute inset-0 border-l border-white/10" />
              </div>
            </div>
            <div className="principle-text mb-8 md:mb-0 relative z-20 text-center md:text-left transition-opacity duration-700 w-full md:flex-1 md:mr-auto md:ml-0 max-w-xl">
              <div className="technical-monoscope text-white/60 mb-2 flex items-center justify-center md:justify-start gap-4">
                <span>01</span>
                <div className="scale-bar w-12" />
                <span className="opacity-80">34° 3' 8" N / 118° 14' 37" W</span>
              </div>
              <h3 className="text-[clamp(1.8rem,3.5vw,2.8rem)] title-serif uppercase tracking-tight mb-2 text-white">
                Who We Are
              </h3>
              <p className="text-stone-300 text-sm tracking-widest uppercase opacity-90">
                Evercrown Constructions is a new generation startup focused on timely delivery of infrastructure that reflects high-quality, functional design, latest technology and beautiful elevation.<br /> <br />

We operate at the intersection of technical expertise, regulatory compliance, and practical execution. Whether it is developing new projects or redeveloping existing properties, we bring a disciplined, detail-oriented approach that prioritizes both efficiency and trust.
              </p>
            </div>
          </div>

          {/* Principle 2: WHAT WE DO */}
          <div className="principle-item mt-12 md:mt-24 lg:mt-32 relative flex flex-col md:flex-row w-full items-center gap-8 md:gap-16 lg:gap-24">
            <div className="principle-text mb-8 md:mb-0 relative z-20 text-center md:text-right transition-opacity duration-700 w-full md:flex-1 md:ml-auto md:mr-0 max-w-xl">
              <div className="technical-monoscope text-white/60 mb-2 flex items-center justify-center md:justify-end gap-4">
                <span>02</span>
                <div className="scale-bar w-12" />
                <span className="opacity-80">
                  52° 31' 12" N / 13° 24' 18" E
                </span>
              </div>
              <h3 className="text-[clamp(1.8rem,3.5vw,2.8rem)] title-serif uppercase tracking-tight mb-2 text-white">
                What We Do
              </h3>
              <p className="text-stone-300 text-sm tracking-widest uppercase opacity-90">
                We offer end-to-end solutions across construction, development,
                and advisory.
              </p>
            </div>
            <div className="box-reveal-wrapper w-full max-w-lg aspect-video relative mx-auto md:mr-auto md:ml-0 md:flex-1">
              <div className="corner-bracket bracket-tl" />
              <div className="corner-bracket bracket-tr" />
              <div className="corner-bracket bracket-bl" />
              <div className="corner-bracket bracket-br" />
              <div className="box-reveal-container w-full bg-black/90 relative border border-white/10">
                <img
                  src="/what-we-do.webp"
                  alt="What We Do"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover opacity-85 select-none pointer-events-none"
                />
                <div className="absolute inset-0 border-r border-white/10" />
              </div>
            </div>
          </div>

          {/* Principle 3: VISION, MISSION & VALUES */}
          <div className="principle-item mt-12 md:mt-24 lg:mt-32 relative flex flex-col-reverse md:flex-row w-full items-center gap-8 md:gap-16 lg:gap-24">
            <div className="box-reveal-wrapper w-full max-w-lg aspect-video relative mx-auto md:ml-auto md:mr-0 md:flex-1">
              <div className="corner-bracket bracket-tl" />
              <div className="corner-bracket bracket-tr" />
              <div className="corner-bracket bracket-bl" />
              <div className="corner-bracket bracket-br" />
              <div className="box-reveal-container w-full bg-black/90 relative border border-white/10">
                <img
                  src="/vision-mission-values.webp"
                  alt="Our Vision, Mission & Values"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover opacity-85 select-none pointer-events-none"
                />
                <div className="absolute inset-0 border-l border-white/10" />
              </div>
            </div>
            <div className="principle-text mb-8 md:mb-0 relative z-20 text-center md:text-left transition-opacity duration-700 w-full md:flex-1 md:mr-auto md:ml-0 max-w-xl">
              <div className="technical-monoscope text-white/60 mb-2 flex items-center justify-center md:justify-start gap-4">
                <span>03</span>
                <div className="scale-bar w-12" />
                <span className="opacity-80">
                  25° 11' 50" N / 55° 16' 26" E
                </span>
              </div>
              <h3 className="text-[clamp(1.6rem,3.2vw,2.4rem)] title-serif uppercase tracking-tight mb-4 text-white leading-tight">
                Our Vision, Mission & Values
              </h3>
              <div className="text-stone-300 text-xs sm:text-sm tracking-widest uppercase opacity-90 space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-1 text-[11px] sm:text-xs tracking-wider">Vision</h4>
                  <p className="leading-relaxed opacity-80">
                    To become India’s most trusted name in the real estate industry by delivering projects that reflect quality and stand the test of time, both structurally and in value.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-[11px] sm:text-xs tracking-wider">Mission</h4>
                  <p className="leading-relaxed opacity-80">
                    To execute projects with transparency, accountability, and precision, while maximizing value for all stakeholders.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-[11px] sm:text-xs tracking-wider">Values</h4>
                  <div className="space-y-1.5 opacity-80 leading-relaxed">
                    <div>• Business Ethics: Clear communication and honest commitments</div>
                    <div>• Quality: No compromise on construction standards</div>
                    <div>• Efficiency: Timely execution through structured planning</div>
                    <div>• Transparency: Open processes and informed decision-making</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Principle 4: OUR APPROACH */}
          <div className="principle-item mt-12 md:mt-24 lg:mt-32 relative flex flex-col md:flex-row w-full items-center gap-8 md:gap-16 lg:gap-24">
            <div className="principle-text mb-8 md:mb-0 relative z-20 text-center md:text-right transition-opacity duration-700 w-full md:flex-1 md:ml-auto md:mr-0 max-w-xl">
              <div className="technical-monoscope text-white/60 mb-2 flex items-center justify-center md:justify-end gap-4">
                <span>04</span>
                <div className="scale-bar w-12" />
                <span className="opacity-80">40° 42' 46" N / 74° 0' 21" W</span>
              </div>
              <h3 className="text-[clamp(1.8rem,3.5vw,2.8rem)] title-serif uppercase tracking-tight mb-2 text-white">
                Our Approach
              </h3>
              <p className="text-stone-300 text-sm tracking-widest uppercase opacity-90">
                Sustainable development through responsible materials and green
                spaces. Prioritizing functional safety and energy-efficient
                design.
              </p>
            </div>
            <div className="box-reveal-wrapper w-full max-w-lg aspect-video relative mx-auto md:mr-auto md:ml-0 md:flex-1">
              <div className="corner-bracket bracket-tl" />
              <div className="corner-bracket bracket-tr" />
              <div className="corner-bracket bracket-bl" />
              <div className="corner-bracket bracket-br" />
              <div className="box-reveal-container w-full bg-black/90 relative border border-white/10">
                <img
                  src="/our-approach.webp"
                  alt="Our Approach"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover opacity-85 select-none pointer-events-none"
                />
                <div className="absolute inset-0 border-r border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build and Develop Section */}
      <section
        id="build-and-develop"
        className="relative h-screen w-full flex items-center justify-start px-8 md:pl-24 md:pr-12 bg-black overflow-hidden z-40"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 select-none pointer-events-none"
          >
            <source src="/build-and-develop.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay to ensure text contrast and premium look */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50 z-[1]" />
        </div>

        {/* Architectural Blueprint Lines Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10%" cy="75%" r="40%" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="10%" cy="75%" r="40.5%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,5" />
            <circle cx="85%" cy="25%" r="25%" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="85%" cy="25%" r="25.5%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="85%" y1="22%" x2="85%" y2="28%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="82%" y1="25%" x2="88%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        </div>

        {/* Text Content */}
        <div className="relative z-20 max-w-4xl w-full text-left">
          <div className="technical-monoscope text-[#E5D3B3]/80 mb-6 flex items-center gap-3">
            <span className="tracking-[0.3em]">05 // BUILD & DEVELOP</span>
          </div>
          
          <h2 className="text-[clamp(3.5rem,7vw,6.5rem)] font-light leading-[1.05] tracking-tighter text-white select-none font-inter">
            Immerse <br />
            yourself <br />
            in the <span className="font-cormorant italic text-[#E5D3B3] font-normal lowercase">vibrant</span> <br />
            colours of life
          </h2>

          <p className="mt-8 text-stone-400 text-sm font-light tracking-wide max-w-md leading-relaxed">
            Crafting architectural masterpieces that blend modern innovation with sustainable luxury. Every space is built from the ground up to elevate your vision of living.
          </p>
        </div>

        {/* Bottom decorative coordinates / info */}
        <div className="absolute bottom-10 left-8 md:left-24 z-20 technical-monoscope text-white/40 text-[10px] tracking-widest flex gap-8">
          <span>SEC. 05 / BUILD_DEV</span>
          <span className="hidden sm:inline">COORD: 34.0522° N, 118.2437° W</span>
        </div>
      </section>

      <LiquidMaskSection />

      <AdvisorySection />

      <ContactSection />

      {/* Global Building Layer (Above standard sections, below Portfolio overlay) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[150vw] md:w-full flex justify-center items-end px-0 md:px-6 pointer-events-none hero-image-container">
        <img
          src="/Homepage.webp"
          alt="Evercrown Homepage Hero"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="hero-image w-full max-w-5xl xl:max-w-6xl drop-shadow-2xl translate-z-0 block opacity-0"
        />
      </div>

      {/* Global Scroll Down Indicator (Placed above building) */}
      <div className="scroll-indicator">
        <div className="mouse-circle">
          <div className="mouse-icon">
            <div className="mouse-wheel" />
          </div>
        </div>
        <span className="scroll-text">Scroll Down</span>
      </div>
    </div>
  );
};

export default App;
