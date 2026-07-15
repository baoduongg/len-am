import React from "react";

/**
 * Xử lý sự kiện click vào các liên kết hash trên trang chủ.
 * Ngăn chặn lỗi Next.js Router tạo ra các URL trùng hash (như /#contact#workshop).
 */
export function handleHashClick(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetId: string
) {
  if (typeof window === "undefined") return;

  // Nếu đang ở trang chủ, thực hiện cuộn mượt và cập nhật URL thủ công
  if (window.location.pathname === "/") {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Cập nhật hash trên URL mà không kích hoạt router của Next.js
      window.history.pushState(null, "", `#${targetId}`);
    }
  }
}
