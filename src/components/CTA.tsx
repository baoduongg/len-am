"use client";

import { useState } from "react";

export default function CTA() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState("Sáng Chủ Nhật (9:00 - 11:30)");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <section id="workshop" className="py-24 relative overflow-hidden bg-transparent">
      {/* Anchor for Yarn Thread curve to flow into the top-left of this section */}
      <div 
        data-yarn-anchor 
        className="absolute top-0 left-[25%] w-5 h-5 pointer-events-none opacity-0" 
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Form Container Card */}
        <div className="relative rounded-[32px] bg-[#FAF1EC] border border-[#F1E3D8] p-8 md:p-12 shadow-sm text-center">
          
          {/* Anchor for Yarn Thread to cross right in the center/behind the form */}
          <div 
            data-yarn-anchor 
            className="absolute top-[20%] right-[10%] w-5 h-5 pointer-events-none opacity-0 z-0" 
          />

          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8C3E30] tracking-tight">
                Đăng ký Workshop
              </h2>
              <p className="text-[#7A5C4A] text-sm md:text-base font-light">
                Cùng học đan những món đồ ấm áp đầu tiên của bạn.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/80 border border-[#A24B3C]/10 rounded-2xl p-8 space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#E7B8AC]/40 text-[#8C3E30] flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#3C2E24]">Đăng ký thành công!</h3>
                <p className="text-sm text-[#7A5C4A] font-light max-w-md mx-auto">
                  Cảm ơn bạn đã đăng ký tham gia workshop của Len Ấm. Chúng mình sẽ liên hệ với bạn qua số điện thoại <strong>{phone}</strong> sớm nhất để xác nhận vị trí nhé!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-[#7A5C4A] tracking-wider uppercase pl-1">
                      Họ và tên
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên của bạn"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#F1E3D8] text-[#3C2E24] placeholder-[#7A5C4A]/40 text-sm focus:border-[#A24B3C]/50 focus:outline-none transition-colors duration-200"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-semibold text-[#7A5C4A] tracking-wider uppercase pl-1">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#F1E3D8] text-[#3C2E24] placeholder-[#7A5C4A]/40 text-sm focus:border-[#A24B3C]/50 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Session select dropdown */}
                <div className="space-y-2">
                  <label htmlFor="session" className="text-xs font-semibold text-[#7A5C4A] tracking-wider uppercase pl-1">
                    Chọn buổi học
                  </label>
                  <div className="relative">
                    <select
                      id="session"
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#F1E3D8] text-[#3C2E24] text-sm focus:border-[#A24B3C]/50 focus:outline-none appearance-none transition-colors duration-200 cursor-pointer"
                    >
                      <option>Sáng Chủ Nhật (9:00 - 11:30)</option>
                      <option>Chiều Thứ Bảy (14:00 - 16:30)</option>
                      <option>Sáng Thứ Bảy (9:00 - 11:30)</option>
                    </select>
                    {/* Dropdown Chevron arrow */}
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-[#7A5C4A]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#7A5C4A] hover:bg-[#5E4738] text-white font-bold text-base shadow-sm hover:shadow-md hover:shadow-[#7A5C4A]/10 transition-all duration-300 active:scale-[0.98]"
                  >
                    Gửi đăng ký ngay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Anchor for Yarn Thread curve to flow to the bottom-right under this section */}
        <div 
          data-yarn-anchor 
          className="w-10 h-10 ml-auto mt-16 pointer-events-none opacity-0" 
        />
        
      </div>
    </section>
  );
}
