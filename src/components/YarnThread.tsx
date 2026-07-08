"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Point {
  x: number;
  y: number;
}

export default function YarnThread() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathBgRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const pathBg = pathBgRef.current;
    const ball = ballRef.current;

    if (!container || !path || !pathBg || !ball) return;

    // Track viewport width/height to avoid infinite layout recursion
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    // Function to calculate and update SVG path coordinates directly in the DOM
    const updatePath = () => {
      const containerRect = container.getBoundingClientRect();
      const anchors = Array.from(document.querySelectorAll("[data-yarn-anchor]"));
      
      if (anchors.length < 2) return 0;

      const points: Point[] = anchors.map((anchor) => {
        const rect = anchor.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

      // Generate a smooth cubic Bezier curve that flows vertically
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        
        // Control points are placed midway vertically to create vertical-flowing S-curves
        const cpY1 = p0.y + (p1.y - p0.y) / 2;
        const cpY2 = p0.y + (p1.y - p0.y) / 2;
        
        d += ` C ${p0.x} ${cpY1}, ${p1.x} ${cpY2}, ${p1.x} ${p1.y}`;
      }

      // Update path definitions in DOM directly to bypass React render cycle
      path.setAttribute("d", d);
      pathBg.setAttribute("d", d);

      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
      });

      return pathLength;
    };

    // Calculate initial path coordinates and length
    let pathLength = updatePath();

    // Initial styles
    gsap.set(pathBg, { opacity: 0.1 });
    
    if (isReducedMotion) {
      gsap.set(path, { strokeDashoffset: 0 });
      gsap.set(ball, { display: "none" });
      return;
    }

    if (pathLength > 0) {
      const startPoint = path.getPointAtLength(0);
      gsap.set(ball, {
        x: startPoint.x,
        y: startPoint.y,
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
      });
    }

    // ScrollTrigger to animate path drawing and ball movement
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentLength = path.getTotalLength();
        
        // Draw the path on scroll
        const drawOffset = currentLength * (1 - progress);
        gsap.set(path, { strokeDashoffset: drawOffset });
        
        // Animate the yarn ball following the path
        if (progress > 0 && progress < 1) {
          try {
            const point = path.getPointAtLength(progress * currentLength);
            gsap.set(ball, {
              x: point.x,
              y: point.y,
              opacity: 1,
            });
          } catch (e) {}
        } else if (progress === 0) {
          try {
            const point = path.getPointAtLength(0);
            gsap.set(ball, { x: point.x, y: point.y, opacity: 0 });
          } catch (e) {}
        } else if (progress === 1) {
          try {
            const point = path.getPointAtLength(currentLength);
            gsap.set(ball, { x: point.x, y: point.y, opacity: 0 });
          } catch (e) {}
        }
      },
    });

    const handleLoad = () => {
      pathLength = updatePath();
      ScrollTrigger.refresh();
    };

    const handleResize = () => {
      // Only recalculate if viewport dimensions actually changed (ignore keyboard toggles or minor pixel shifts)
      if (Math.abs(window.innerWidth - lastWidth) > 5 || Math.abs(window.innerHeight - lastHeight) > 5) {
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
        pathLength = updatePath();
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleResize);

    // Run updates at staggered intervals to sync path coordinates as images load
    const intervals = [300, 800, 1500, 3000];
    const timers = intervals.map((delay) => 
      setTimeout(() => {
        pathLength = updatePath();
        ScrollTrigger.refresh();
      }, delay)
    );

    return () => {
      trigger.kill();
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      timers.forEach(clearTimeout);
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 w-full overflow-hidden"
      style={{ minHeight: "100%" }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: "none" }}
      >
        {/* Background guide line */}
        <path
          ref={pathBgRef}
          stroke="#A24B3C"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Animated drawing line */}
        <path
          ref={pathRef}
          stroke="#A24B3C"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Traveling Yarn Ball Indicator */}
      <div
        ref={ballRef}
        className="absolute w-8 h-8 rounded-full bg-[#A24B3C] text-[#FCF6F2] flex items-center justify-center shadow-lg shadow-[#A24B3C]/35 select-none pointer-events-none z-20"
        style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
      >
        <svg
          className="w-5 h-5 animate-spin"
          style={{ animationDuration: "10s" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2c1.5 1.5 2.5 3.5 2.5 6s-1 4.5-2.5 6-2.5-3.5-2.5-6 1-4.5 2.5-6zm-8 8c1.5-1.5 3.5-2.5 6-2.5s4.5 1 6 2.5-3.5 2.5-6 2.5-4.5-1-6-2.5z"
          />
        </svg>
      </div>
    </div>
  );
}
