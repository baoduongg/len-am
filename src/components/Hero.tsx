"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-32 pb-16 md:pt-40 md:pb-24 flex items-center overflow-hidden bg-transparent">
      {/* Decorative top-right yarn doodle / anchor point */}
      <div 
        data-yarn-anchor 
        className="absolute top-28 right-[10%] w-10 h-10 flex items-center justify-center opacity-40 z-20 pointer-events-none"
      >
        {/* Little decorative yarn squiggle from design */}
        <svg
          className="w-16 h-16 text-[#A24B3C]"
          viewBox="0 0 100 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            d="M10,25 Q30,5 50,25 T90,25"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <div className="space-y-3">
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#8C3E30] tracking-tight leading-tight">
                Len Ấm
              </h1>
              <p className="text-xl md:text-2xl font-serif italic text-[#7A5C4A] font-medium leading-relaxed">
                Thủ công từ đôi bàn tay ấm.
              </p>
            </div>
            
            <p className="text-[#3C2E24]/80 text-base md:text-lg max-w-[45ch] font-light leading-relaxed">
              Từng sợi len được chọn lọc cẩn thận và đan dệt bằng tất cả sự tỉ mẩn, mang đến sự ấm áp và bình yên cho không gian của bạn.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
              <Link
                href="#products"
                className="px-8 py-3.5 rounded-full bg-[#C97A6D] hover:bg-[#B5675A] text-white font-medium shadow-sm hover:shadow-md hover:shadow-[#C97A6D]/15 transition-all duration-300 active:scale-95 text-center flex-1 sm:flex-initial"
              >
                Xem sản phẩm
              </Link>
              <a
                href="#workshop"
                className="px-8 py-3.5 rounded-full bg-[#7A5C4A] hover:bg-[#5E4738] text-white font-medium shadow-sm hover:shadow-md hover:shadow-[#7A5C4A]/15 transition-all duration-300 active:scale-95 text-center flex-1 sm:flex-initial"
              >
                Đăng ký workshop
              </a>
            </div>

            {/* Anchor for Yarn Thread curve to flow to the left */}
            <div 
              data-yarn-anchor 
              className="w-10 h-10 -ml-5 mt-8 pointer-events-none opacity-0" 
            />
          </div>

          {/* Right: Premium Yarn Ball Image with Glow */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            {/* Soft pink glow circle behind yarn ball */}
            <div className="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[460px] md:h-[460px] bg-[#E7B8AC]/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-white/80 shadow-xl shadow-[#3C2E24]/10 transition-transform duration-500 hover:scale-103 group z-10 bg-white">
              <Image
                src="/hero-yarn.png"
                alt="Cuộn len hồng ấm áp tại Len Ấm"
                fill
                priority
                className="object-cover"
                sizes="(max-w-768px) 300px, 400px"
              />
            </div>
            
            {/* Spinning/floating decorative accent yarn lines */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#A24B3C] border border-[#F1E3D8] animate-bounce pointer-events-none" style={{ animationDuration: "3s" }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
