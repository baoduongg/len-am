"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@/store/useStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"cart" | "workshop">("cart");

  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  
  const workshopRegistrations = useStore((state) => state.workshopRegistrations);
  const cancelWorkshop = useStore((state) => state.cancelWorkshop);
  const loadWorkshopRegistrations = useStore((state) => state.loadWorkshopRegistrations);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

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

  useEffect(() => {
    loadWorkshopRegistrations();
  }, [loadWorkshopRegistrations]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-surface/85 backdrop-blur-md py-4 shadow-warm-sm border-b border-border-custom/30"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-serif font-bold text-accent transition-transform duration-300 group-hover:scale-102">
                Len Ấm
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              <Link
                href="/yarns"
                className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider transition-colors duration-200"
              >
                Sản phẩm
              </Link>
              <Link
                href="/#story"
                className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider transition-colors duration-200"
              >
                Câu chuyện
              </Link>
              <Link
                href="/#workshop"
                className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider transition-colors duration-200"
              >
                Workshop
              </Link>
              <Link
                href="/#contact"
                className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider transition-colors duration-200"
              >
                Liên hệ
              </Link>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Shopping Cart Icon with dynamic badge */}
              <motion.button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-ink-muted hover:text-accent transition-colors duration-200 relative focus:outline-none"
                aria-label="Giỏ hàng"
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-5.5 h-5.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                  />
                </svg>
                {/* Dynamic count badge */}
                <AnimatePresence>
                  {(cartCount > 0 || workshopRegistrations.length > 0) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-accent text-[9px] font-bold text-[#FFFCF7] flex items-center justify-center shadow-sm"
                    >
                      {cartCount + workshopRegistrations.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <Link
                href="/yarns"
                className="px-5 py-2.5 rounded-btn text-xs font-semibold bg-accent text-[#FFFCF7] hover:bg-[#A96340] hover:shadow-warm-sm transition-all duration-300 active:scale-95"
              >
                Mua ngay
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-ink-muted hover:text-accent relative focus:outline-none"
                aria-label="Giỏ hàng"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                  />
                </svg>
                {(cartCount > 0 || workshopRegistrations.length > 0) && (
                  <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-full bg-accent text-[9px] font-bold text-[#FFFCF7] flex items-center justify-center shadow-sm">
                    {cartCount + workshopRegistrations.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-ink-muted hover:text-accent focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-surface border-t border-border-custom/50 shadow-warm-md overflow-hidden"
            >
              <div className="flex flex-col space-y-4 px-6 py-6">
                <Link
                  href="/yarns"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider py-2"
                >
                  Sản phẩm
                </Link>
                <Link
                  href="/#story"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider py-2"
                >
                  Câu chuyện
                </Link>
                <Link
                  href="/#workshop"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider py-2"
                >
                  Workshop
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-ink-muted hover:text-accent uppercase tracking-wider py-2"
                >
                  Liên hệ
                </Link>
                <div className="h-px bg-border-custom/50 my-2" />
                
                <Link
                  href="/yarns"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3 rounded-btn text-center text-xs font-semibold bg-accent text-[#FFFCF7] hover:bg-[#A96340] transition-all"
                >
                  Mua ngay
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Connected surface: Slide-over Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-[#2B2622]"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border-custom/50">
                <span className="font-serif text-lg font-bold text-ink">
                  {activeTab === "cart" ? "Giỏ hàng của bạn" : "Workshop đã đăng ký"}
                </span>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-hover-fill flex items-center justify-center text-ink focus:outline-none"
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>

              {/* Tabs Navigation */}
              <div className="flex border-b border-border-custom/50 my-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("cart")}
                  className={`flex-1 pb-3 text-center transition-all border-b-2 ${
                    activeTab === "cart"
                      ? "border-accent text-accent"
                      : "border-transparent text-ink-muted hover:text-ink"
                  }`}
                >
                  Giỏ hàng ({cartCount})
                </button>
                <button
                  onClick={() => setActiveTab("workshop")}
                  className={`flex-1 pb-3 text-center transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                    activeTab === "workshop"
                      ? "border-accent text-accent"
                      : "border-transparent text-ink-muted hover:text-ink"
                  }`}
                >
                  <span>Workshop</span>
                  {workshopRegistrations.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-accent text-[#FFFCF7] text-[9px] font-bold">
                      {workshopRegistrations.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Drawer Content */}
              {activeTab === "cart" ? (
                /* SHOPPING CART TAB */
                <>
                  <div className="flex-grow overflow-y-auto space-y-4 pr-1">
                    {cart.length === 0 ? (
                      <div className="text-center py-20 flex flex-col items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="w-12 h-12 text-ink-muted/50 mb-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                          />
                        </svg>
                        <p className="text-xs text-ink-muted">Giỏ hàng đang trống.</p>
                        <Link
                          href="/yarns"
                          onClick={() => setIsCartOpen(false)}
                          className="mt-4 px-4 py-2 bg-accent text-[#FFFCF7] text-xs font-semibold rounded-btn"
                        >
                          Khám phá sản phẩm
                        </Link>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={`${item.product.id}-${item.selectedColor.hex}`}
                          className="flex gap-4 p-3 bg-surface rounded-inner border border-border-custom/40 shadow-warm-sm"
                        >
                          <div className="relative w-16 h-20 rounded-inner overflow-hidden flex-shrink-0 bg-background">
                            <Image
                              src={item.selectedColor.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <h4 className="font-serif text-sm font-bold text-ink truncate">
                              {item.product.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-border-custom/50"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span className="text-[10px] text-ink-muted">
                                Màu: {item.selectedColor.name}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 border border-border-custom/60 rounded-btn px-2 py-0.5 bg-background">
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.selectedColor.hex, item.quantity - 1)}
                                  className="text-xs text-ink hover:text-accent font-bold"
                                >
                                  -
                                </button>
                                <span className="text-xs font-semibold text-ink">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.selectedColor.hex, item.quantity + 1)}
                                  className="text-xs text-ink hover:text-accent font-bold"
                                >
                                  +
                                </button>
                              </div>
                              
                              <span className="text-xs font-semibold text-ink">
                                {(item.product.price * item.quantity).toLocaleString("vi-VN")}đ
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor.hex)}
                            className="text-xs text-ink-muted hover:text-accent self-start p-1"
                            aria-label="Remove item"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Checkout block */}
                  {cart.length > 0 && (
                    <div className="pt-4 border-t border-border-custom/50 mt-6 space-y-4">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="text-ink-muted">Tạm tính</span>
                        <span className="text-ink font-bold text-base">
                          {cartTotal.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                      <button
                        onClick={() => alert("Chức năng thanh toán chỉ là giao diện demo.")}
                        className="w-full py-3.5 bg-accent hover:bg-[#A96340] text-[#FFFCF7] text-xs font-semibold rounded-btn transition-colors shadow-warm-sm"
                      >
                        Tiến hành thanh toán
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* WORKSHOP REGISTRATION TAB */
                <div className="flex-grow overflow-y-auto space-y-4 pr-1">
                  {workshopRegistrations.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="w-12 h-12 text-ink-muted/50 mb-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <p className="text-xs text-ink-muted">Bạn chưa đăng ký workshop nào.</p>
                      <a
                        href="/#workshop"
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 px-4 py-2 bg-accent-sage text-[#FFFCF7] text-xs font-semibold rounded-btn"
                      >
                        Xem lịch học
                      </a>
                    </div>
                  ) : (
                    workshopRegistrations.map((reg, index) => (
                      <div
                        key={`${reg.registeredAt}-${index}`}
                        className="flex gap-4 p-4 bg-surface rounded-inner border border-border-custom/40 shadow-warm-sm items-start"
                      >
                        <div className="w-10 h-10 rounded-btn bg-[#FAF6EF] flex flex-col items-center justify-center flex-shrink-0 text-accent border border-border-custom/30">
                          <span className="text-[9px] font-bold uppercase text-accent-sage leading-none">WS</span>
                          <span className="text-xs font-bold leading-tight">am</span>
                        </div>

                        <div className="flex-grow min-w-0">
                          <h4 className="font-serif text-sm font-bold text-ink leading-tight">
                            {reg.session}
                          </h4>
                          <div className="text-[10px] text-ink-muted mt-2 space-y-0.5">
                            <p>Học viên: <span className="font-medium text-ink">{reg.name}</span></p>
                            <p>SĐT liên hệ: <span className="font-medium text-ink">{reg.phone}</span></p>
                            <p className="text-[9px] opacity-75 mt-1">Đăng ký vào: {new Date(reg.registeredAt).toLocaleDateString("vi-VN")}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc chắn muốn hủy đăng ký lớp học "${reg.session}"?`)) {
                              cancelWorkshop(index);
                            }
                          }}
                          className="text-xs text-ink-muted hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                          aria-label="Hủy đăng ký"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
