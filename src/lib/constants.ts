export interface NavLink {
  href: string;
  /** id của section trên trang chủ — dùng cho scroll mượt qua handleHashClick */
  hash?: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/yarns", label: "Sản phẩm" },
  { href: "/#story", hash: "story", label: "Câu chuyện" },
  { href: "/#workshop", hash: "workshop", label: "Workshop" },
  { href: "/#contact", hash: "contact", label: "Liên hệ" },
];
