"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/store/useStore";

export default function Home() {
  const products = useStore((state) => state.products);
  const featuredProducts = products.filter((p) => p.featured);

  // Stagger entry configurations
  const fadeUpVariants = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#C17A56]/15 selection:text-[#C17A56] relative">
      <Navbar />

      <main className="flex-grow">
        {/* SECTION 1: HERO (Asymmetric Z-Axis Cascade) */}
        <section className="relative min-h-[90dvh] pt-32 pb-24 md:pt-48 md:pb-36 flex items-center bg-transparent">
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Bold Typography & CTAs */}
              <motion.div 
                className="lg:col-span-7 space-y-6 flex flex-col items-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
              >
                <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-accent/30 text-accent bg-accent/5 inline-block">
                  Sợi len tự nhiên cao cấp
                </span>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-ink tracking-tight leading-[1.05] font-serif">
                  Dệt nên ấm áp <br />
                  <span className="italic font-medium text-accent font-serif font-light">từ đôi bàn tay</span>
                </h1>
                
                <p className="text-ink-muted text-sm md:text-base max-w-[45ch] font-normal leading-relaxed">
                  Tuyển chọn những dòng len lông cừu Merino, tơ Alpaca tơ hảo hạng nhập khẩu nguyên cuộn. Đồng hành cùng bạn kiến tạo những sản phẩm thủ công tinh xảo, bền vững cùng thời gian.
                </p>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
                  <Link
                    href="/yarns"
                    className="pl-6 pr-2.5 py-2.5 rounded-btn bg-accent text-[#FFFCF7] flex items-center gap-4 font-semibold text-xs shadow-warm-md hover:bg-[#A96340] group transition-colors duration-300"
                  >
                    <span>Khám phá sợi len</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-[#FFFCF7]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </Link>

                  <a
                    href="#workshop"
                    className="px-6 py-3.5 rounded-btn border border-border-custom hover:bg-hover-fill text-ink font-semibold text-xs transition-colors duration-300"
                  >
                    Lịch học Workshop
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Premium Z-Axis Cascade cards (overlapping) */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end py-10">
                {/* Background ambient glow circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-sage/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-full max-w-[380px] h-[400px]">
                  {/* Card 1: Under layer, rotated left */}
                  <motion.div 
                    className="absolute left-0 top-0 w-64 h-80 rounded-card overflow-hidden shadow-warm-md border border-border-custom bg-surface p-2"
                    initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.3 }}
                    whileHover={{ rotate: -2, y: -5, zIndex: 30 }}
                  >
                    <div className="relative w-full h-full rounded-inner overflow-hidden">
                      <Image
                        src="/hero-yarn.png"
                        alt="Yarn skeins close up"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Card 2: Over layer, rotated right */}
                  <motion.div 
                    className="absolute right-0 bottom-0 w-56 h-72 rounded-card overflow-hidden shadow-warm-lg border-4 border-surface bg-surface p-1.5"
                    initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.5 }}
                    whileHover={{ rotate: 1, y: -5, zIndex: 30 }}
                  >
                    <div className="relative w-full h-full rounded-inner overflow-hidden">
                      <Image
                        src="/workshop-shop.png"
                        alt="Knitting workshop hands"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* SECTION 2: VALUE PROPS (Generous Spacing, Micro-cards) */}
        <section className="py-28 md:py-36 bg-[#FFFCF7]/60 border-y border-border-custom/50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">Giá trị cốt lõi</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink tracking-tight leading-tight">
                Mỗi cuộn len là một câu chuyện
              </h2>
              <p className="text-xs text-ink-muted leading-relaxed font-normal">
                Chúng mình tỉ mẩn trong từng khâu lựa chọn, để mỗi sợi len mang lại cảm hứng sáng tạo vô tận và sự trọn vẹn cho bạn.
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Prop 1: Traceable Fibers */}
              <motion.div variants={fadeUpVariants} className="double-bezel-outer shadow-warm-sm hover:shadow-warm-md">
                <div className="double-bezel-inner p-8 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink">Nguồn gốc minh bạch</h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-normal">
                    Từng lô sợi đều có mã định danh trang trại, cam kết quy trình chăn nuôi nhân đạo và thu hoạch nhân văn từ các đồng cỏ tự nhiên.
                  </p>
                </div>
              </motion.div>

              {/* Prop 2: Naturally Dyed */}
              <motion.div variants={fadeUpVariants} className="double-bezel-outer shadow-warm-sm hover:shadow-warm-md">
                <div className="double-bezel-inner p-8 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-accent-sage/5 border border-accent-sage/20 flex items-center justify-center text-accent-sage">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 1 1 0 18A9 9 0 0 1 12 3Z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink">Màu sắc thảo mộc</h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-normal">
                    Nhuộm thủ công từ vỏ quả óc chó, củ nghệ và chàm tự nhiên. Đảm bảo dải màu sắc mộc mạc và hoàn toàn không hóa chất gây kích ứng.
                  </p>
                </div>
              </motion.div>

              {/* Prop 3: Slow Spun */}
              <motion.div variants={fadeUpVariants} className="double-bezel-outer shadow-warm-sm hover:shadow-warm-md">
                <div className="double-bezel-inner p-8 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096m.813 5.096h6.75M9.813 15.904a8.25 8.25 0 0113.128-6.09m-13.128 6.09a9.022 9.022 0 01-5.626-4.938m0 0L3 11m.248-1.127A8.25 8.25 0 0118.067 4.19M3.248 9.873a9.023 9.023 0 005.626 4.939m0 0l-.813-5.096H3.248" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink">Chế tác chậm rãi</h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-normal">
                    Các xưởng kéo sợi gia đình gìn giữ nghề kéo sợi chậm qua nhiều thế hệ, giữ nguyên độ xốp phồng tự nhiên của xơ lông thú.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: FEATURED CATEGORIES (Asymmetrical Bento Grid) */}
        <section className="py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">Chất liệu tuyển chọn</span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink tracking-tight">Bộ sưu tập sợi tự nhiên</h2>
              </div>
              <Link 
                href="/yarns" 
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1.5"
              >
                <span>Xem tất cả danh mục</span>
                <span>→</span>
              </Link>
            </div>

            {/* Bento Grid Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
              
              {/* Category 1: Merino Wool */}
              <Link 
                href="/yarns" 
                className="md:col-span-2 group relative rounded-card overflow-hidden border border-border-custom/50 shadow-warm-md flex flex-col justify-end p-8"
              >
                <div className="absolute inset-0 bg-[#2B2622]/20 z-10 transition-colors duration-500 group-hover:bg-[#2B2622]/35" />
                <Image
                  src="/product-merino.png"
                  alt="Merino collection"
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="relative z-20 space-y-1 text-[#FFFCF7]">
                  <span className="text-[9px] uppercase tracking-widest font-semibold bg-accent/80 px-2 py-0.5 rounded-full inline-block">Mềm mại nhất</span>
                  <h3 className="font-serif text-2xl font-bold">Lông cừu Merino</h3>
                  <p className="text-[11px] text-[#FFFCF7]/80 font-light max-w-sm">
                    Dòng sợi đàn hồi vượt trội, cực mềm và không dặm ngứa cho mọi làn da.
                  </p>
                </div>
              </Link>

              {/* Category 2: Alpaca Cloud */}
              <Link 
                href="/yarns" 
                className="md:col-span-1 group relative rounded-card overflow-hidden border border-border-custom/50 shadow-warm-md flex flex-col justify-end p-8"
              >
                <div className="absolute inset-0 bg-[#2B2622]/20 z-10 transition-colors duration-500 group-hover:bg-[#2B2622]/35" />
                <Image
                  src="/product-wool.png"
                  alt="Alpaca collection"
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="relative z-20 space-y-1 text-[#FFFCF7]">
                  <span className="text-[9px] uppercase tracking-widest font-semibold bg-accent-sage/80 px-2 py-0.5 rounded-full inline-block">Ấm áp tối đa</span>
                  <h3 className="font-serif text-2xl font-bold">Baby Alpaca</h3>
                  <p className="text-[11px] text-[#FFFCF7]/80 font-light">
                    Độ phồng xốp tối ưu với cấu trúc rỗng giữ ấm siêu hạng.
                  </p>
                </div>
              </Link>

              {/* Category 3: Egyptian Cotton */}
              <Link 
                href="/yarns" 
                className="md:col-span-1 group relative rounded-card overflow-hidden border border-border-custom/50 shadow-warm-md flex flex-col justify-end p-8"
              >
                <div className="absolute inset-0 bg-[#2B2622]/20 z-10 transition-colors duration-500 group-hover:bg-[#2B2622]/35" />
                <Image
                  src="/product-cotton.png"
                  alt="Organic cotton collection"
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="relative z-20 space-y-1 text-[#FFFCF7]">
                  <span className="text-[9px] uppercase tracking-widest font-semibold bg-accent/80 px-2 py-0.5 rounded-full inline-block">Hữu cơ 100%</span>
                  <h3 className="font-serif text-2xl font-bold">Sợi bông Cotton</h3>
                  <p className="text-[11px] text-[#FFFCF7]/80 font-light">
                    Sợi mềm mịn, mát lành thích hợp nhất cho tiết trời mùa xuân hè.
                  </p>
                </div>
              </Link>

              {/* Category 4: Belgian Linen Flax */}
              <Link 
                href="/yarns" 
                className="md:col-span-2 group relative rounded-card overflow-hidden border border-border-custom/50 shadow-warm-md flex flex-col justify-end p-8"
              >
                <div className="absolute inset-0 bg-[#2B2622]/20 z-10 transition-colors duration-500 group-hover:bg-[#2B2622]/35" />
                <Image
                  src="/workshop-shop.png"
                  alt="Linen Flax collection"
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="relative z-20 space-y-1 text-[#FFFCF7]">
                  <span className="text-[9px] uppercase tracking-widest font-semibold bg-accent-sage/80 px-2 py-0.5 rounded-full inline-block">Mộc mạc & Thấm hút</span>
                  <h3 className="font-serif text-2xl font-bold">Belgian Flax Linen</h3>
                  <p className="text-[11px] text-[#FFFCF7]/80 font-light max-w-sm">
                    Sợi lanh dệt thủ công mộc mạc mang nét rũ phóng khoáng vượt thời gian.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: BESTSELLERS GRID (Reusing ProductCard) */}
        <section className="py-28 md:py-36 bg-[#FFFCF7]/60 border-t border-border-custom/50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">Được yêu thích nhất</span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink tracking-tight">Cuộn len bán chạy nhất</h2>
              </div>
              <Link 
                href="/yarns" 
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1.5"
              >
                <span>Xem tất cả sản phẩm</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {featuredProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: NEWSLETTER SIGNUP (Double Bezel Enclosure) */}
        <section className="py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="double-bezel-outer max-w-3xl mx-auto shadow-warm-lg">
              <div className="double-bezel-inner p-10 md:p-16 text-center space-y-6 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">Cộng đồng đan len</span>
                
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink tracking-tight max-w-xl">
                  Nhận những câu chuyện ấm áp qua hộp thư
                </h2>
                
                <p className="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
                  Đăng ký để nhận thông tin về các dòng len tuyển chọn mới về hàng, bài viết chia sẻ kỹ thuật đan tay nâng cao và mã giảm giá 10% cho đơn hàng đầu tiên.
                </p>

                {/* Email Sign Up Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Cảm ơn bạn đã đăng ký thư nhận tin!");
                  }}
                  className="w-full max-w-md pt-4 flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="Địa chỉ email của bạn..."
                    className="flex-grow bg-background border border-border-custom rounded-btn px-4 py-3 text-xs text-ink focus:outline-none focus:border-accent transition-colors shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-btn bg-accent text-[#FFFCF7] font-semibold text-xs shadow-warm-sm hover:bg-[#A96340] active:scale-[0.98] transition-all focus:outline-none"
                  >
                    Đăng ký thư
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: WORKSHOP (Extra value prop highlight) */}
        <section id="workshop" className="py-20 bg-surface/30 border-t border-border-custom/50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden shadow-warm-md border border-border-custom p-2 bg-surface">
                <div className="relative w-full h-full rounded-inner overflow-hidden">
                  <Image
                    src="/workshop-shop.png"
                    alt="Len Ấm workshop space"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">Trải nghiệm thủ công</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink tracking-tight">
                  Lớp học Đan len cuối tuần
                </h2>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Gác lại những bộn bề công việc, tìm về sự tĩnh lặng qua từng đường kim mũi chỉ. Workshop của chúng mình hướng dẫn từ cơ bản đến nâng cao tại không gian ấm cúng tại Sài Gòn, phục vụ sẵn trà thảo mộc thơm lành.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => alert("Chức năng đặt chỗ workshop sẽ được cập nhật sớm.")}
                    className="pl-6 pr-2.5 py-2.5 rounded-btn bg-accent-sage text-[#FFFCF7] flex items-center gap-4 font-semibold text-xs shadow-warm-sm hover:opacity-90 group transition-all duration-300"
                  >
                    <span>Đặt chỗ ngay</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:scale-105">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-[#FFFCF7]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
