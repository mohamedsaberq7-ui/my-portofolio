"use client";

import { useState, useEffect } from "react";
import { NavItemProps } from "@/interface";
import NavItems from "../ui/NavItems";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const navItems: NavItemProps[] = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <header className="absolute top-0 left-0 w-full px-6 sm:px-8 md:px-16 py-6 md:py-8 flex justify-between items-center z-50">
      <Link
        href={"/"}
        className="font-serif text-xl text-gray-800 tracking-wide z-50 relative"
      >
        Eng.Saber
      </Link>

      {/* Desktop Nav */}
      <NavItems navItems={navItems} />

      {/* Mobile Burger Icon */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden z-50 relative p-2 text-gray-800 focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col items-end justify-center gap-1.5 overflow-hidden">
          <span className={`block h-[2px] w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block h-[2px] w-4 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 translate-x-4" : ""}`} />
          <span className={`block h-[2px] w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f5f3eb] flex flex-col items-center justify-center animate-[fadeIn_0.2s_ease-out_forwards]">
          <nav className="flex flex-col space-y-8 text-center text-xl font-medium tracking-wide">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
