import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Len Ấm - Premium Yarns & Sewing Supplies",
  description: "Nơi chia sẻ và lưu giữ những câu chuyện ấm áp qua từng sợi len. Cửa hàng len thủ công tuyển chọn và workshop đan len ấm áp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fraunces.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        {/* Fixed Noise Overlay for Organic Editorial Texture */}
        <div className="noise-overlay" aria-hidden="true" />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
