import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const REVEAL_SELECTORS = [
  ".app main section",
  ".app main .md-page",
  ".app main .pg-page",
  ".app main .about-page > .container.section",
  ".app main .contact-page .page-header",
  ".app main .notfound-page .breadcrumb-banner",
  ".app main .md-card",
  ".app main .pg-card",
  ".app main .market-info-card",
  ".app main .produce-card",
  ".app main .p-card",
  ".app main .opened-card",
  ".app main .feature-card",
  ".app main .feature-item",
  ".app main .faq-item",
  ".app main .team-icon",
  ".app main .schedule-row",
  ".app main .produce-item",
];

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const targets = [
      ...new Set(
        REVEAL_SELECTORS.flatMap((selector) =>
          Array.from(document.querySelectorAll(selector)),
        ),
      ),
    ].filter(
      (element) =>
        !element.classList.contains("animate-fade-up") &&
        !element.classList.contains("scroll-reveal"),
    );

    if (!targets.length) return undefined;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) =>
        element.classList.add("scroll-reveal-visible"),
      );
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((element, index) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.85) {
        element.classList.add("scroll-reveal-visible");
        return;
      }
      element.classList.add("scroll-reveal");
      element.style.setProperty(
        "--scroll-reveal-delay",
        `${Math.min(index % 5, 4) * 35}ms`,
      );
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      targets.forEach((element) => {
        element.classList.remove("scroll-reveal", "scroll-reveal-visible");
        element.style.removeProperty("--scroll-reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
