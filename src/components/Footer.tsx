import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0F172A] text-white overflow-hidden pt-20">

      {/* Background Glows (Διακοσμητικά φώτα) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Container - Εδώ διορθώνουμε τη διάταξη */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Top Section: Heading & Email --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">

          {/* Left Side: Headline */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-blue-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Creative Studio
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white mb-6">
              Let's build your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                digital legacy.
              </span>
            </h2>

            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Premium social media management, content creation, and web design.
              Elevating brands with sophisticated digital presence.
            </p>
          </div>

          {/* Right Side: Big Email Button */}
          <div className="lg:mb-4">
            <Link
              href="/contact"
              className="group flex items-center gap-4 text-xl md:text-2xl lg:text-3xl font-light text-white hover:text-blue-400 transition-colors duration-300"
            >
              <span>rebrandingbyzoe@gmail.com</span>
              <span className="p-3 rounded-full bg-white/10 border border-white/10 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/10 mb-16" />

        {/* --- Bottom Section: Links --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-medium text-white mb-4">Rebranding by Zoe</h3>
            <p className="text-sm text-slate-400">
              Athens, Greece based<br />Digital Creative Studio
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Explore
            </h4>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
              <Link href="/services" className="text-slate-300 hover:text-white transition-colors">Services</Link>
              <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Follow Us
            </h4>
            <div className="flex flex-col space-y-4">
              <a
                href="https://instagram.com/rebranding_byzoe"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white group"
              >
                <span>Instagram</span>
                <svg className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- Copyright Bar --- */}
      <div className="border-t border-white/10 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {currentYear} Rebranding by Zoe. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Social Media</span>
            <span>Content</span>
            <span>Web Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}