"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useStore, Product } from "@/store/useStore";

export default function YarnsPage() {
  const {
    products,
    filters,
    toggleFiber,
    toggleWeight,
    toggleColor,
    setPriceRange,
    setSortBy,
    resetFilters
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // List of available filter options matching our database
  const fiberOptions = ["Merino", "Alpaca", "Silk", "Cotton", "Linen"];
  const weightOptions = ["Fingering", "Sport", "DK", "Worsted", "Chunky"];
  const colorOptions = [
    { name: "Oat Milk", hex: "#EAE2D6" },
    { name: "Sage", hex: "#93A382" },
    { name: "Terracotta", hex: "#C17A56" }
  ];

  // Apply filters in memory
  const filteredProducts = products.filter((product) => {
    if (filters.fibers.length > 0 && !filters.fibers.includes(product.fiber)) {
      return false;
    }
    if (filters.weights.length > 0 && !filters.weights.includes(product.weight)) {
      return false;
    }
    if (filters.colors.length > 0 && !product.colors.some((c) => filters.colors.includes(c.name))) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (filters.sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (filters.sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // default featured
  });

  // Count active filters
  const activeFiltersCount =
    filters.fibers.length +
    filters.weights.length +
    filters.colors.length +
    (filters.priceRange[0] > 100000 || filters.priceRange[1] < 600000 ? 1 : 0);

  // Grid animation config
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 24
      }
    }
  };

  const SidebarContent = () => (
    <div className="space-y-8 pr-4">
      {/* Active Filter Indicators */}
      {activeFiltersCount > 0 && (
        <div className="p-4 bg-surface rounded-inner border border-border-custom/80 shadow-warm-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-ink uppercase tracking-wider">
              Đang chọn ({activeFiltersCount})
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-accent hover:underline font-medium"
            >
              Xóa tất cả
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.fibers.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-hover-fill text-ink"
              >
                {f}
                <button onClick={() => toggleFiber(f)} className="hover:text-accent font-bold">×</button>
              </span>
            ))}
            {filters.weights.map((w) => (
              <span
                key={w}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-hover-fill text-ink"
              >
                {w}
                <button onClick={() => toggleWeight(w)} className="hover:text-accent font-bold">×</button>
              </span>
            ))}
            {filters.colors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-hover-fill text-ink"
              >
                Màu: {c}
                <button onClick={() => toggleColor(c)} className="hover:text-accent font-bold">×</button>
              </span>
            ))}
            {(filters.priceRange[0] > 100000 || filters.priceRange[1] < 600000) && (
              <span
                key="price"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-hover-fill text-ink"
              >
                {(filters.priceRange[0]/1000).toFixed(0)}k - {(filters.priceRange[1]/1000).toFixed(0)}k
                <button
                  onClick={() => setPriceRange([100000, 600000])}
                  className="hover:text-accent font-bold"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filter Category: Fiber Type */}
      <div>
        <h4 className="font-serif text-sm font-semibold text-ink mb-3 tracking-wide">
          Chất liệu (Fiber)
        </h4>
        <div className="space-y-2">
          {fiberOptions.map((fiber) => {
            const checked = filters.fibers.includes(fiber);
            return (
              <label key={fiber} className="flex items-center gap-2.5 text-xs text-ink-muted cursor-pointer hover:text-ink transition-colors">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFiber(fiber)}
                  className="w-4 h-4 rounded border-border-custom text-accent focus:ring-accent accent-accent"
                />
                <span className={checked ? "text-ink font-medium" : ""}>{fiber}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter Category: Yarn Weight */}
      <div>
        <h4 className="font-serif text-sm font-semibold text-ink mb-3 tracking-wide">
          Độ dày sợi (Weight)
        </h4>
        <div className="space-y-2">
          {weightOptions.map((weight) => {
            const checked = filters.weights.includes(weight);
            return (
              <label key={weight} className="flex items-center gap-2.5 text-xs text-ink-muted cursor-pointer hover:text-ink transition-colors">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleWeight(weight)}
                  className="w-4 h-4 rounded border-border-custom text-accent focus:ring-accent accent-accent"
                />
                <span className={checked ? "text-ink font-medium" : ""}>{weight}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter Category: Color Palette */}
      <div>
        <h4 className="font-serif text-sm font-semibold text-ink mb-3 tracking-wide">
          Màu sắc tuyển chọn
        </h4>
        <div className="space-y-2">
          {colorOptions.map((col) => {
            const checked = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleColor(col.name)}
                className="flex items-center justify-between w-full text-left py-1 text-xs text-ink-muted hover:text-ink transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-border-custom/50 shadow-sm block"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className={checked ? "text-ink font-semibold" : ""}>{col.name}</span>
                </div>
                {checked && (
                  <span className="text-accent text-[10px] font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Category: Price Range */}
      <div>
        <h4 className="font-serif text-sm font-semibold text-ink mb-3 tracking-wide">
          Khoảng giá (VND)
        </h4>
        
        {/* Visual range indicator buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setPriceRange([100000, 300000])}
            className={`px-3 py-1.5 rounded-btn border text-[10px] font-medium text-center transition-all ${
              filters.priceRange[0] === 100000 && filters.priceRange[1] === 300000
                ? "bg-accent text-[#FFFCF7] border-accent"
                : "bg-surface hover:bg-hover-fill text-ink-muted border-border-custom"
            }`}
          >
            100k - 300k
          </button>
          <button
            onClick={() => setPriceRange([300000, 600000])}
            className={`px-3 py-1.5 rounded-btn border text-[10px] font-medium text-center transition-all ${
              filters.priceRange[0] === 300000 && filters.priceRange[1] === 600000
                ? "bg-accent text-[#FFFCF7] border-accent"
                : "bg-surface hover:bg-hover-fill text-ink-muted border-border-custom"
            }`}
          >
            300k - 600k
          </button>
        </div>

        {/* Dynamic price input fields */}
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-ink-muted uppercase">Min</span>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), filters.priceRange[1]])}
              className="w-full bg-surface border border-border-custom rounded-btn pl-8 pr-2 py-1.5 text-xs text-ink focus:outline-none focus:border-accent"
            />
          </div>
          <span className="text-ink-muted">—</span>
          <div className="relative flex-grow">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-ink-muted uppercase">Max</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => setPriceRange([filters.priceRange[0], Number(e.target.value)])}
              className="w-full bg-surface border border-border-custom rounded-btn pl-8 pr-2 py-1.5 text-xs text-ink focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#C17A56]/15 selection:text-[#C17A56]">
      <Navbar />

      <main className="flex-grow pt-28 pb-24 px-6 md:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6 tracking-wide" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent transition-colors font-medium">Trang chủ</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Sợi len tuyển chọn</span>
        </nav>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-border-custom/50">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">
              Sợi len tuyển chọn
            </h1>
            <p className="text-xs text-ink-muted font-normal max-w-xl">
              Các dòng len tự nhiên từ sợi lông cừu Merino, tơ Alpaca cao cấp kết hợp lụa tơ tằm. Dành cho những dự án đan tay chứa đựng tình yêu.
            </p>
          </div>
          
          {/* Sorting & Filter Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden px-4 py-2 bg-surface hover:bg-hover-fill text-xs font-semibold rounded-btn border border-border-custom text-ink flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
              Bộ lọc {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>

            {/* Sort Control */}
            <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-btn border border-border-custom">
              <span className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">Sắp xếp</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-ink font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex gap-10">
          {/* Desktop Left Sidebar Filter */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <SidebarContent />
            </div>
          </aside>

          {/* Product Grid Panel */}
          <div className="flex-grow">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-surface rounded-card border border-border-custom/50 shadow-warm-sm flex flex-col items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 text-ink-muted/55 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                <h3 className="font-serif text-lg font-bold text-ink mb-1">Không tìm thấy sản phẩm</h3>
                <p className="text-xs text-ink-muted mb-6 max-w-xs leading-relaxed">
                  Chúng tôi không tìm thấy cuộn len nào phù hợp với các tiêu chí bộ lọc của bạn.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-accent hover:bg-[#A96340] text-[#FFFCF7] text-xs font-semibold rounded-btn transition-colors shadow-warm-sm focus:outline-none"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              <div>
                <div className="text-xs text-ink-muted mb-6 font-medium">
                  Hiển thị <span className="text-ink font-semibold">{sortedProducts.length}</span> sản phẩm phù hợp
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
                >
                  {sortedProducts.map((product) => (
                    <motion.div key={product.id} variants={itemVariants} className="h-full">
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter Overlay Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-[#2B2622]"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-background p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border-custom/50 mb-6">
                <span className="font-serif text-lg font-bold text-ink">Bộ lọc sản phẩm</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-hover-fill flex items-center justify-center text-ink focus:outline-none"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto pb-6">
                <SidebarContent />
              </div>
              
              <div className="pt-4 border-t border-border-custom/50 grid grid-cols-2 gap-3 mt-auto">
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="py-3 text-xs font-semibold text-ink border border-border-custom rounded-btn bg-surface hover:bg-hover-fill transition-colors"
                >
                  Xóa bộ lọc
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="py-3 text-xs font-semibold text-[#FFFCF7] bg-accent hover:bg-[#A96340] rounded-btn transition-colors shadow-warm-sm"
                >
                  Xem kết quả ({sortedProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
