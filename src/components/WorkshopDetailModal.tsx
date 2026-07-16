"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@/store/useStore";
import { IconCircle } from "@/components/ui/CtaButton";
import { formatPrice } from "@/utils/format";
import { useBodyScrollLock } from "@/utils/useBodyScrollLock";

interface WorkshopDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopId: string | null;
}

interface WorkshopData {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  level: string;
  size: string;
  location: string;
  syllabus: string[];
  materials: string;
  sessions: string[];
}

export const WORKSHOP_DETAILS: Record<string, WorkshopData> = {
  basics: {
    id: "basics",
    tag: "Nhập môn",
    title: "Workshop Chạm Sợi",
    description: "Buổi học làm quen với kim đan gỗ, tìm hiểu các dòng len tự nhiên và thực hiện những mũi đan cơ bản đầu tiên bên ly trà thảo mộc ấm.",
    image: "/workshop/raw/scene-3.jpeg",
    price: 350000,
    duration: "2.5 tiếng",
    level: "Người mới bắt đầu",
    size: "Tối đa 6 học viên",
    location: "Tầng 2, Cửa hàng Len Ấm, Quận 1, Sài Gòn",
    syllabus: [
      "Tìm hiểu nguồn gốc, tính chất các dòng sợi tự nhiên (Merino, Alpaca, Cotton)",
      "Làm quen và thực hành cầm kim đan gỗ thông truyền thống",
      "Học kỹ thuật bắt mũi đan cơ bản đầu tiên (Cast on)",
      "Làm chủ mũi đan xuống cơ bản (Knit stitch)",
      "Tự tay hoàn thiện một chiếc lót ly len xinh xắn mang về nhà"
    ],
    materials: "1 cuộn len Merino cao cấp, kim đan gỗ thông Thụy Điển, trà thảo mộc ấm và bánh ngọt.",
    sessions: [
      "Sáng Thứ Bảy (9:00 - 11:30)",
      "Chiều Thứ Bảy (14:00 - 16:30)",
      "Sáng Chủ Nhật (9:00 - 11:30)"
    ]
  },
  crochet: {
    id: "crochet",
    tag: "Móc len Amigurumi",
    title: "Workshop Móc Túi & Phụ Kiện",
    description: "Khám phá thế giới móc sợi cotton hữu cơ mềm mịn, tự tay hoàn thiện các chú thú bông nhỏ xinh hoặc túi đựng bình nước xinh xắn.",
    image: "/workshop/raw/scene-4.jpeg",
    price: 400000,
    duration: "3.5 tiếng",
    level: "Cơ bản & Nhập môn",
    size: "Tối đa 5 học viên",
    location: "Tầng 2, Cửa hàng Len Ấm, Quận 1, Sài Gòn",
    syllabus: [
      "Hướng dẫn cách đọc chart móc (bản vẽ kỹ thuật đan móc) cơ bản",
      "Kỹ thuật tạo vòng tròn ma thuật (Magic ring) trong móc thú bông",
      "Thực hành mũi móc xích (Chain), mũi đơn (Single Crochet) và mũi kép",
      "Cách khâu ráp các bộ phận Amigurumi hoặc đan nối thân túi xách",
      "Hoàn thiện một sản phẩm túi đựng bình nước hoặc thú bông mini"
    ],
    materials: "2 cuộn len Organic Cotton, kim móc cán dẻo, phụ kiện cúc gỗ mộc, trà thảo mộc ấm và bánh ngọt.",
    sessions: [
      "Sáng Thứ Bảy (9:00 - 12:30)",
      "Chiều Thứ Bảy (14:00 - 17:30)",
      "Chiều Chủ Nhật (14:00 - 17:30)"
    ]
  },
  advanced: {
    id: "advanced",
    tag: "Kỹ thuật nâng cao",
    title: "Workshop Dệt Ấm Áp",
    description: "Nơi học viên thực hành các kỹ thuật vặn thừng phức tạp hơn để tạo nên những chiếc khăn choàng lông cừu Merino hay áo len độc bản.",
    image: "/workshop/raw/scene-5.jpeg",
    price: 850000,
    duration: "2 buổi (mỗi buổi 3 tiếng)",
    level: "Trung & Nâng cấp (Đã biết đan cơ bản)",
    size: "Tối đa 4 học viên",
    location: "Tầng 2, Cửa hàng Len Ấm, Quận 1, Sài Gòn",
    syllabus: [
      "Kỹ thuật đan họa tiết vặn thừng (Cables) truyền thống tạo khối nổi",
      "Làm chủ cách sử dụng kim đan phụ (Cable needle) để giữ mũi tạm thời",
      "Kỹ thuật đan hạt gạo (Seed stitch) và kỹ thuật tạo sườn co giãn (Ribbing)",
      "Cách tính cỡ đan (Gauge) và tùy chỉnh size khăn/áo theo số đo thực tế",
      "Bắt đầu dự án tự đan một chiếc khăn choàng vặn thừng Merino cao cấp"
    ],
    materials: "3 cuộn len lông cừu Merino Extra Fine nhập khẩu, kim đan vòng, kim đan phụ, chart hướng dẫn in màu, trà/cà phê thơm lành.",
    sessions: [
      "Chiều Thứ Bảy (14:00 - 17:00, học 2 tuần liên tiếp)",
      "Chiều Chủ Nhật (14:00 - 17:00, học 2 tuần liên tiếp)"
    ]
  }
};

export default function WorkshopDetailModal({ isOpen, onClose, workshopId }: WorkshopDetailModalProps) {
  const registerWorkshop = useStore((state) => state.registerWorkshop);
  const addToast = useStore((state) => state.addToast);

  const [mode, setMode] = useState<"details" | "register" | "success">("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const workshop = workshopId ? WORKSHOP_DETAILS[workshopId] : null;

  useBodyScrollLock(isOpen);

  // Reset form states when modal opens/closes or workshop changes
  useEffect(() => {
    if (isOpen && workshop) {
      setMode("details");
      setName("");
      setPhone("");
      setSession(workshop.sessions[0] || "");
      setPhoneError("");
    }
  }, [isOpen, workshop]);

  if (!workshop) return null;

  const validatePhone = (p: string) => {
    const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
    return vnPhoneRegex.test(p);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!name.trim()) return;
    const cleanPhone = phone.replace(/\s+/g, "");

    if (!validatePhone(cleanPhone)) {
      setPhoneError("Số điện thoại không đúng định dạng (ví dụ: 0912345678)");
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay with tactile loading pause
    await new Promise((resolve) => setTimeout(resolve, 1000));

    registerWorkshop({
      name: name.trim(),
      phone: cleanPhone,
      session,
      workshopTitle: workshop.title,
    });

    addToast(`Đăng ký thành công lớp đan ${workshop.title}`, "success");
    setIsSubmitting(false);
    setMode("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop blur with GPU acceleration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isSubmitting ? undefined : onClose}
            className="fixed inset-0 bg-ink/60 backdrop-blur-md cursor-pointer pointer-events-auto"
            style={{ willChange: "opacity" }}
          />

          {/* Double-Bezel Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="double-bezel-outer w-full max-w-5xl shadow-warm-lg relative z-10 pointer-events-auto my-auto overflow-hidden animate-fadeIn h-auto md:h-[680px]"
          >
            <div className="double-bezel-inner bg-surface p-2 md:p-3 h-full max-h-[90dvh] flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-12 rounded-[calc(var(--radius-card)-12px)] overflow-hidden bg-surface h-full min-h-0">

                {/* LEFT COLUMN: Visual Presentation */}
                <div className="md:col-span-5 relative p-2 bg-surface-alt/40 h-auto md:h-full min-h-0 flex-shrink-0">
                  <motion.div
                    layoutId={`workshop-image-wrap-${workshop.id}`}
                    transition={{ type: "spring", stiffness: 180, damping: 24 }}
                    className="relative w-full aspect-[16/10] md:aspect-auto md:h-full rounded-inner overflow-hidden shadow-inner"
                  >
                    <Image
                      src={workshop.image}
                      alt={workshop.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 35vw"
                      priority
                    />
                    {/* Visual paper-grain noise in visual window */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none z-10" />

                    {/* Overlay info on image for premium look */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 text-surface space-y-1">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-90 px-2 py-0.5 bg-accent/90 rounded-full w-max block border border-white/10">
                        {workshop.tag}
                      </span>
                      <p className="font-serif text-lg font-bold leading-tight drop-shadow-sm">
                        {workshop.title}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* RIGHT COLUMN: Interactive Details / Forms */}
                <div className="md:col-span-7 flex flex-col relative h-[440px] md:h-full min-h-0">

                  {/* Close button with circular spring physics hover */}
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-hover-fill hover:bg-hover-fill/80 flex items-center justify-center text-ink transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none disabled:opacity-50 z-20 cursor-pointer"
                    aria-label="Đóng cửa sổ"
                  >
                    ✕
                  </button>

                  {/* Scrollable content container with custom thin scrollbar */}
                  <div className="flex-grow overflow-y-auto pl-6 py-6 pr-4 md:pl-8 md:py-8 md:pr-6 h-full select-none scrollbar-thin">
                    <div className="pr-6 h-full min-h-full flex flex-col">
                      <AnimatePresence mode="wait">

                        {/* MODE 1: DETAILS DISPLAY */}
                        {mode === "details" && (
                          <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6 flex-grow flex flex-col justify-between h-full"
                          >
                            <div className="space-y-4">
                              {/* Eyebrow and Title */}
                              <div className="space-y-1 pr-6">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent block">
                                  Chi tiết lớp học
                                </span>
                                <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-tight">
                                  {workshop.title}
                                </h2>
                              </div>

                              <p className="text-xs text-ink-muted leading-relaxed font-light">
                                {workshop.description}
                              </p>

                              {/* Quick Facts Grid (Calibrated styling) */}
                              <div className="grid grid-cols-2 gap-4 p-4 rounded-inner border border-border-custom bg-background/40 text-xs">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Thời lượng</span>
                                    <strong className="font-semibold text-ink">{workshop.duration}</strong>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Mức độ</span>
                                    <strong className="font-semibold text-ink">{workshop.level}</strong>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Học phí</span>
                                    <strong className="font-semibold text-accent">{formatPrice(workshop.price)}</strong>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128a11.386 11.386 0 01-3-.109m-3 1.112a9.38 9.38 0 00-2.625.372 9.337 9.337 0 00-4.121-.952 4.125 4.125 0 007.533-2.493M9 19.128v-.003c0-1.113.285-2.16.786-3.07M15 7.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Sĩ số</span>
                                    <strong className="font-semibold text-ink">{workshop.size}</strong>
                                  </div>
                                </div>
                              </div>

                              {/* Syllabus Checklist */}
                              <div className="space-y-2.5">
                                <span className="text-[10px] font-bold text-ink uppercase tracking-wider pl-0.5">Nội dung học phần</span>
                                <ul className="space-y-2">
                                  {workshop.syllabus.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-ink-muted font-normal leading-relaxed">
                                      <svg className="w-4 h-4 text-accent-sage flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                      </svg>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Included Materials */}
                              <div className="text-[11px] text-ink-muted leading-relaxed font-light italic border-t border-border-custom/50 pt-3">
                                <strong>Học cụ chuẩn bị sẵn:</strong> {workshop.materials}
                              </div>
                            </div>

                            {/* CTA: Slide-into-Form Trigger */}
                            <div className="pt-4 border-t border-border-custom/50 mt-auto">
                              <button
                                onClick={() => setMode("register")}
                                className="w-full pl-6 pr-3 py-3.5 rounded-btn bg-accent text-surface flex items-center justify-between font-semibold text-xs shadow-warm-md hover:bg-accent-dark active:scale-[0.98] transition-all duration-300 group cursor-pointer"
                              >
                                <span>Đăng ký giữ chỗ lớp này</span>
                                <IconCircle className="w-7 h-7" iconClassName="w-3 h-3" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* MODE 2: REGISTRATION FORM */}
                        {mode === "register" && (
                          <motion.div
                            key="register"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="pt-4 flex-grow flex flex-col justify-between w-full h-full"
                          >
                            {/* Back Button and Header */}
                            <div className="space-y-2 pr-6">
                              <button
                                onClick={() => setMode("details")}
                                disabled={isSubmitting}
                                className="text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1 hover:underline disabled:opacity-50 mb-1 focus:outline-none cursor-pointer"
                              >
                                ← Quay lại chi tiết
                              </button>
                              <h2 className="font-serif text-2xl font-bold text-ink leading-tight">
                                Phiếu Đăng Ký Học
                              </h2>
                              <p className="text-xs text-ink-muted font-light leading-relaxed">
                                Vui lòng điền thông tin liên hệ của bạn dưới đây. Len Ấm sẽ gọi điện xác nhận lại trong vòng 24 giờ.
                              </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between mt-6 w-full h-full">
                              <div className="space-y-4">
                                {/* Name Input */}
                                <div className="space-y-1.5">
                                  <label htmlFor="detail-modal-name" className="text-[10px] font-bold text-ink uppercase tracking-wider pl-0.5 block">
                                    Họ và tên của bạn
                                  </label>
                                  <input
                                    id="detail-modal-name"
                                    type="text"
                                    required
                                    disabled={isSubmitting}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ví dụ: Hoàng Hải Yến"
                                    className="w-full px-4 py-3 rounded-btn bg-background border border-border-custom text-ink placeholder-ink-muted/40 text-base focus:outline-none focus:border-accent transition-colors duration-200 disabled:opacity-50"
                                  />
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-1.5">
                                  <label htmlFor="detail-modal-phone" className="text-[10px] font-bold text-ink uppercase tracking-wider pl-0.5 block">
                                    Số điện thoại
                                  </label>
                                  <input
                                    id="detail-modal-phone"
                                    type="tel"
                                    required
                                    disabled={isSubmitting}
                                    value={phone}
                                    onChange={(e) => {
                                      setPhone(e.target.value);
                                      if (phoneError) setPhoneError("");
                                    }}
                                    placeholder="Ví dụ: 0912345678"
                                    className={`w-full px-4 py-3 rounded-btn bg-background border ${phoneError ? "border-red-400 focus:border-red-400" : "border-border-custom focus:border-accent"} text-ink placeholder-ink-muted/40 text-base focus:outline-none transition-colors duration-200 disabled:opacity-50`}
                                  />
                                  {phoneError && (
                                    <p className="text-[10px] text-red-500 font-medium pl-0.5 animate-fadeIn">
                                      {phoneError}
                                    </p>
                                  )}
                                </div>

                                {/* Session Choice select */}
                                <div className="space-y-1.5">
                                  <label htmlFor="detail-modal-session" className="text-[10px] font-bold text-ink uppercase tracking-wider pl-0.5 block">
                                    Chọn ca học phù hợp
                                  </label>
                                  <div className="relative">
                                    <select
                                      id="detail-modal-session"
                                      disabled={isSubmitting}
                                      value={session}
                                      onChange={(e) => setSession(e.target.value)}
                                      className="w-full px-4 py-3 rounded-btn bg-background border border-border-custom text-ink text-xs focus:outline-none focus:border-accent appearance-none transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {workshop.sessions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                      ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-ink-muted">
                                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Submit form button with loading state */}
                              <div className="pt-4 border-t border-border-custom/50 mt-auto">
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="w-full pl-6 pr-3 py-3.5 rounded-btn bg-accent text-surface flex items-center justify-between font-semibold text-xs shadow-warm-md hover:bg-accent-dark active:scale-[0.98] transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
                                >
                                  <span>{isSubmitting ? "Đang xử lý đăng ký..." : "Xác nhận đặt chỗ"}</span>
                                  <IconCircle className="w-7 h-7" iconClassName="w-3 h-3" />
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}

                        {/* MODE 3: TICKET / REGISTRATION SUCCESS */}
                        {mode === "success" && (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6 text-center py-4 flex-grow flex flex-col justify-center items-center"
                          >
                            <div className="w-14 h-14 rounded-full bg-accent-sage/20 text-accent-sage flex items-center justify-center border border-accent-sage/30 shadow-warm-sm">
                              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>

                            <div className="space-y-1">
                              <h3 className="font-serif text-xl font-bold text-ink">Giữ chỗ thành công!</h3>
                              <p className="text-[11px] text-ink-muted leading-relaxed max-w-sm">
                                Chào mừng bạn ghé chơi xưởng dệt thủ công của <strong>Len Ấm</strong>. Hãy kiểm tra các thông tin lớp học dưới đây nhé:
                              </p>
                            </div>

                            {/* Creative tear-off ticket wrapper */}
                            <div className="border border-dashed border-border-custom bg-background/50 rounded-inner overflow-hidden p-5 space-y-4 relative w-full max-w-sm text-left shadow-warm-sm">

                              {/* Cutout notch decorations */}
                              <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-surface border border-border-custom rounded-full -translate-y-1/2 z-10" />
                              <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-surface border border-border-custom rounded-full -translate-y-1/2 z-10" />

                              <div className="text-center pb-2 border-b border-dashed border-border-custom/80">
                                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-accent">
                                  Vé Tham Dự Workshop
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
                                <div>
                                  <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Người đăng ký</span>
                                  <strong className="font-medium text-ink">{name}</strong>
                                </div>
                                <div>
                                  <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Số điện thoại</span>
                                  <strong className="font-medium text-ink">{phone}</strong>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Buổi học & Thời gian</span>
                                  <strong className="font-medium text-accent block">{session}</strong>
                                  <span className="text-[10px] text-ink-muted font-light">{workshop.duration}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Học phí (Thu tại lớp)</span>
                                  <strong className="font-semibold text-ink">{formatPrice(workshop.price)}</strong>
                                </div>
                                <div>
                                  <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Địa điểm</span>
                                  <span className="text-[10px] text-ink-muted font-light block leading-tight">
                                    Tầng 2, Len Ấm, Q.1
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-[10px] text-ink-muted italic leading-relaxed max-w-xs mx-auto">
                              * Bạn có thể xem lại hoặc hủy lớp đã đăng ký trong mục “Workshop” ở Giỏ hàng.
                            </p>

                            <div className="pt-2">
                              <button
                                onClick={onClose}
                                className="px-8 py-3 rounded-btn bg-accent text-surface text-xs font-semibold shadow-warm-sm hover:bg-accent-dark active:scale-[0.95] transition-all duration-300 cursor-pointer"
                              >
                                Đóng cửa sổ
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
