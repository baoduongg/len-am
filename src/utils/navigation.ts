import React from "react";

export function scrollToSection(targetId: string, behavior: ScrollBehavior = "smooth"): boolean {
  const element = document.getElementById(targetId);
  if (!element) return false;

  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 80;
  const offsetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top: offsetPosition, behavior });
  return true;
}

export function handleHashClick(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetId: string
) {
  if (typeof window === "undefined") return;

  
  if (window.location.pathname === "/") {
    e.preventDefault();
    if (scrollToSection(targetId)) {
      
      window.history.pushState(null, "", `#${targetId}`);
    }
  }
}

export function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
  if (typeof window === "undefined") return;

  if (window.location.pathname === "/") {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.history.pushState(null, "", "/");
  }
}
