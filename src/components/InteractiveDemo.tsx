"use client";

import Image from "next/image";

export default function InteractiveDemo() {
  return (
    <section id="story" className="py-24 relative overflow-hidden bg-transparent">
      {/* Anchor for Yarn Thread to flow into this section on the left */}
      <div 
        data-yarn-anchor 
        className="absolute top-0 left-[15%] w-5 h-5 pointer-events-none opacity-0" 
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Cozy Workshop Image & Floating Badge */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Soft pink glow background */}
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#E7B8AC]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative w-full max-w-[480px] h-[360px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg shadow-[#3C2E24]/5 border-4 border-white">
              <Image
                src="/workshop-shop.png"
                alt="Không gian workshop ấm cúng tại Len Ấm"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 480px"
              />
            </div>
            
            {/* Floating Badge Card */}
            <div className="absolute bottom-6 right-6 md:right-10 bg-white border border-[#F1E3D8] rounded-2xl py-3 px-5 flex items-center space-x-3.5 shadow-lg shadow-[#3C2E24]/5 animate-bounce" style={{ animationDuration: "4s" }}>
              <div className="w-10 h-10 rounded-full bg-[#E7B8AC]/30 flex items-center justify-center text-[#8C3E30]">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="font-bold text-[#3C2E24] text-sm block">2000+</span>
                <span className="text-xs text-[#7A5C4A] font-light">Học viên workshop</span>
              </div>
            </div>
          </div>

          {/* Right: Story details */}
          <div className="lg:col-span-6 space-y-8 text-left relative">
            
            {/* Anchor for Yarn Thread to curve towards the right side near the text */}
            <div 
              data-yarn-anchor 
              className="absolute top-1/3 right-4 w-5 h-5 pointer-events-none opacity-0" 
            />

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8C3E30] tracking-tight leading-tight">
                Sợi len kết nối tâm hồn
              </h2>
              <p className="text-[#3C2E24]/85 text-base md:text-lg font-light leading-relaxed max-w-[55ch]">
                Tại Len Ấm, chúng mình tin rằng mỗi mũi đan là một nhịp đập của trái tim, mỗi cuộn len là một câu chuyện đang chờ được kể. Trong 5 năm hành trình, chúng mình không chỉ bán len, mà còn là nơi lưu giữ những khoảnh khắc tỉ mẩn và ấm áp nhất.
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF1EC] border border-[#F1E3D8] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                <span className="text-2xl font-serif font-bold text-[#8C3E30] block mb-1">5 năm</span>
                <span className="text-sm text-[#7A5C4A] font-light">Hành trình đam mê</span>
              </div>
              <div className="bg-[#FAF1EC] border border-[#F1E3D8] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                <span className="text-2xl font-serif font-bold text-[#8C3E30] block mb-1">100%</span>
                <span className="text-sm text-[#7A5C4A] font-light">Thủ công tự nhiên</span>
              </div>
            </div>

            {/* Read more link */}
            <div className="pt-2">
              <a
                href="#story"
                className="group inline-flex items-center space-x-2 text-sm font-semibold text-[#8C3E30] hover:text-[#733328] transition-colors"
              >
                <span>Xem thêm câu chuyện của chúng mình</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
            
          </div>
          
        </div>
        
        {/* Anchor for Yarn Thread curve to flow to the bottom-left under this section */}
        <div 
          data-yarn-anchor 
          className="w-10 h-10 mt-16 pointer-events-none opacity-0" 
        />
        
      </div>
    </section>
  );
}
