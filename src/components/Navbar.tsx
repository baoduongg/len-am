"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass py-4 shadow-sm shadow-[#A24B3C]/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-serif font-bold text-[#A24B3C] tracking-tight transition-transform duration-300 group-hover:scale-102">
              Len Ấm
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <a
              href="#products"
              className="text-sm font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors duration-200"
            >
              Sản phẩm
            </a>
            <a
              href="#story"
              className="text-sm font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors duration-200"
            >
              Câu chuyện
            </a>
            <a
              href="#workshop"
              className="text-sm font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors duration-200"
            >
              Workshop
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors duration-200"
            >
              Liên hệ
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Shopping Cart Icon */}
            <button 
              className="p-2 text-[#7A5C4A] hover:text-[#A24B3C] transition-colors duration-200 relative"
              aria-label="Giỏ hàng"
            >
              <svg
                className="w-5.5 h-5.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
              {/* Badge count */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A24B3C]" />
            </button>
            
            <Link
              href="#login"
              className="px-5 py-2 rounded-full text-sm font-medium bg-[#A24B3C] text-[#FCF6F2] hover:bg-[#8C3E30] hover:shadow-md hover:shadow-[#A24B3C]/10 transition-all duration-300 active:scale-95"
            >
              Đăng nhập
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#7A5C4A] hover:text-[#A24B3C] focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass transition-all duration-300 overflow-hidden border-t border-[#A24B3C]/5 ${
          isOpen ? "max-h-80 opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 px-6">
          <a
            href="#products"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors py-2"
          >
            Sản phẩm
          </a>
          <a
            href="#story"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors py-2"
          >
            Câu chuyện
          </a>
          <a
            href="#workshop"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors py-2"
          >
            Workshop
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-[#7A5C4A] hover:text-[#A24B3C] transition-colors py-2"
          >
            Liên hệ
          </a>
          <div className="h-px bg-[#A24B3C]/10 my-2" />
          <div className="flex items-center justify-between gap-4 pt-2">
            <button className="flex items-center space-x-2 text-[#7A5C4A] hover:text-[#A24B3C] transition-colors">
              <svg
                className="w-5.5 h-5.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
              <span className="text-sm font-medium">Giỏ hàng</span>
            </button>
            
            <Link
              href="#login"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-full text-center text-sm font-medium bg-[#A24B3C] text-[#FCF6F2] hover:bg-[#8C3E30] transition-all"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
