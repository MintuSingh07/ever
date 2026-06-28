import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Animate submission
    gsap.to(".contact-form", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => setSubmitted(true),
    });
    gsap.from(".contact-success", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
    });
  };

  useGSAP(
    () => {
      // Left panel reveal
      gsap.from(".contact-left", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 75%",
          once: true, // Fire once — no reverse on mobile
        },
        x: -60,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
      });

      // Right panel reveal
      gsap.from(".contact-right", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 70%",
          once: true, // Fire once — no reverse on mobile
        },
        x: 60,
        opacity: 0,
        duration: 1.4,
        delay: 0.15,
        ease: "expo.out",
      });

      // Info items stagger
      gsap.from(".contact-info-item", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 60%",
          once: true, // Fire once — no reverse on mobile
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.3,
        ease: "power3.out",
      });

      // Form fields stagger
      gsap.from(".form-field", {
        scrollTrigger: {
          trigger: ".contact-right",
          start: "top 80%",
          once: true, // Fire once — no reverse on mobile
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
      });

      // Footer bar
      gsap.from(".contact-footer-bar", {
        scrollTrigger: {
          trigger: "#contact",
          start: "bottom 95%",
          once: true, // Fire once — no reverse on mobile
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.8,
        ease: "expo.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050505] z-40 overflow-hidden py-28 md:py-40 px-8 md:px-24"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-stone-800/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle radial grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="technical-monoscope text-[#E5D3B3]/60 mb-6 flex items-center gap-4">
          <span>07 // CONTACT</span>
          <div className="scale-bar w-16" />
          <span className="opacity-60">REACH_OUT</span>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent mb-16 md:mb-24 contact-footer-bar" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT PANEL ── */}
          <div className="contact-left">
            <h2 className="title-serif text-[clamp(3rem,6vw,6.5rem)] leading-none tracking-tight mb-8">
              <span className="premium-text-silver">Let's build</span>
              <br />
              <span className="architect-outline text-[clamp(3rem,6vw,6.5rem)]">something</span>
              <br />
              <span className="text-[#E5D3B3] font-cormorant italic font-light">remarkable.</span>
            </h2>

            <p className="text-stone-400 text-sm leading-relaxed tracking-wide max-w-sm mb-14">
              Whether you are a first-time investor, a seasoned developer, or a landowner exploring options — we are ready to listen and advise.
            </p>

            {/* Info items */}
            <div className="space-y-8">
              {[
                {
                  label: "OFFICE",
                  value: "Evercrown Constructions Pvt. Ltd.",
                  sub: "Mumbai, Maharashtra — India",
                },
                {
                  label: "EMAIL",
                  value: "hello@evercrown.in",
                  sub: "Response within 24 hours",
                  href: "mailto:hello@evercrown.in",
                },
                {
                  label: "PHONE",
                  value: "+91 98765 43210",
                  sub: "Mon – Sat, 10:00 – 19:00 IST",
                  href: "tel:+919876543210",
                },
              ].map((info) => (
                <div key={info.label} className="contact-info-item flex gap-6 group">
                  <div className="technical-monoscope text-[#E5D3B3]/50 w-14 shrink-0 pt-0.5">
                    {info.label}
                  </div>
                  <div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white/80 text-sm tracking-wide hover:text-white transition-colors duration-300 block mb-1"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/80 text-sm tracking-wide mb-1">{info.value}</p>
                    )}
                    <p className="technical-monoscope text-white/30">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative bottom coordinates */}
            <div className="mt-16 pt-8 border-t border-white/5">
              <p className="technical-monoscope text-white/20">
                19° 4' 8&quot; N / 72° 52' 29&quot; E — MUMBAI HQ
              </p>
            </div>
          </div>

          {/* ── RIGHT PANEL — Form ── */}
          <div className="contact-right">
            {/* Glassmorphism form card */}
            <div className="relative rounded-sm border border-white/8 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10">
              {/* Card corner brackets */}
              <div className="corner-bracket bracket-tl" style={{ borderColor: "rgba(229,211,179,0.3)" }} />
              <div className="corner-bracket bracket-br" style={{ borderColor: "rgba(229,211,179,0.3)" }} />

              {!submitted ? (
                <form className="contact-form space-y-6" onSubmit={handleSubmit}>
                  <div className="technical-monoscope text-[#E5D3B3]/50 mb-8">
                    INITIATE_ENQUIRY // FORM_OPEN
                  </div>

                  {/* Name + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { name: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                      { name: "phone", label: "Phone", type: "tel", placeholder: "+91 00000 00000", required: false },
                    ].map((field) => (
                      <div key={field.name} className="form-field">
                        <label className="technical-monoscope text-white/40 block mb-2">
                          {field.label}{field.required && <span className="text-[#E5D3B3]/60 ml-1">*</span>}
                        </label>
                        <div className={`relative border-b transition-colors duration-300 ${
                          focused === field.name ? "border-[#E5D3B3]/60" : "border-white/15"
                        }`}>
                          <input
                            type={field.type}
                            name={field.name}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={formState[field.name]}
                            onChange={handleChange}
                            onFocus={() => setFocused(field.name)}
                            onBlur={() => setFocused(null)}
                            className="w-full bg-transparent text-white/80 text-sm py-3 tracking-wide outline-none placeholder:text-white/20 transition-colors duration-300 focus:text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label className="technical-monoscope text-white/40 block mb-2">
                      Email Address <span className="text-[#E5D3B3]/60">*</span>
                    </label>
                    <div className={`relative border-b transition-colors duration-300 ${
                      focused === "email" ? "border-[#E5D3B3]/60" : "border-white/15"
                    }`}>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent text-white/80 text-sm py-3 tracking-wide outline-none placeholder:text-white/20 focus:text-white transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Service select */}
                  <div className="form-field">
                    <label className="technical-monoscope text-white/40 block mb-2">Area of Interest</label>
                    <div className={`relative border-b transition-colors duration-300 ${
                      focused === "service" ? "border-[#E5D3B3]/60" : "border-white/15"
                    }`}>
                      <select
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        onFocus={() => setFocused("service")}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent text-sm py-3 tracking-wide outline-none appearance-none cursor-pointer transition-colors duration-300"
                        style={{ color: formState.service ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)" }}
                      >
                        <option value="" disabled style={{ background: "#050505" }}>Select a service</option>
                        <option value="land" style={{ background: "#0f0f0f" }}>Land Acquisition & Feasibility</option>
                        <option value="design" style={{ background: "#0f0f0f" }}>Project Planning & Design</option>
                        <option value="construction" style={{ background: "#0f0f0f" }}>Construction Management</option>
                        <option value="investment" style={{ background: "#0f0f0f" }}>Investment Strategy</option>
                        <option value="other" style={{ background: "#0f0f0f" }}>Other</option>
                      </select>
                      {/* Custom chevron */}
                      <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label className="technical-monoscope text-white/40 block mb-2">Message</label>
                    <div className={`relative border-b transition-colors duration-300 ${
                      focused === "message" ? "border-[#E5D3B3]/60" : "border-white/15"
                    }`}>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Describe your project or query..."
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent text-white/80 text-sm py-3 tracking-wide outline-none resize-none placeholder:text-white/20 focus:text-white transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="form-field pt-2">
                    <button
                      type="submit"
                      className="group relative w-full flex items-center justify-between px-8 py-4 border border-white/15 hover:border-[#E5D3B3]/50 transition-all duration-500 overflow-hidden"
                    >
                      {/* Hover fill */}
                      <div className="absolute inset-0 bg-[#E5D3B3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative tracking-[0.25em] text-xs uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                        Send Enquiry
                      </span>
                      <div className="relative flex items-center gap-2">
                        <div className="w-8 h-px bg-white/30 group-hover:w-12 group-hover:bg-[#E5D3B3]/60 transition-all duration-500" />
                        <svg className="w-3 h-3 text-white/40 group-hover:text-[#E5D3B3]/80 transition-colors duration-300" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>
                    <p className="technical-monoscope text-white/20 mt-4 text-center">
                      YOUR DETAILS ARE KEPT STRICTLY CONFIDENTIAL
                    </p>
                  </div>
                </form>
              ) : (
                <div className="contact-success flex flex-col items-center justify-center py-16 text-center gap-6">
                  <div className="w-14 h-14 border border-[#E5D3B3]/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#E5D3B3]/80" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="title-serif text-3xl premium-text-silver">Message Received.</h3>
                  <p className="text-stone-400 text-sm leading-relaxed tracking-wide max-w-xs">
                    Thank you for reaching out. Our team will respond within 24 business hours.
                  </p>
                  <p className="technical-monoscope text-white/20">ENQUIRY_STATUS // SUBMITTED</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="technical-monoscope text-white/20">
            © {new Date().getFullYear()} EVERCROWN CONSTRUCTIONS PVT. LTD. — ALL RIGHTS RESERVED
          </p>
          <p className="technical-monoscope text-white/15">
            RERA REGISTERED // CIN: U45200MH2024PTC000000
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
