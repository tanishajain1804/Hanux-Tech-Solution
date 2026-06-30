import React, { useEffect, useRef, useState } from "react";
import { CursorProvider, useCursorContext } from "../context/CursorContext";
import { ThemeProvider } from "../context/ThemeContext";

// Nested Cursor Follower component that accesses CursorContext
const CursorFollower: React.FC = () => {
  const { cursorType, hoverText, setCursorType, setHoverText } = useCursorContext();
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates
  const mouseCoords = useRef({ x: 0, y: 0 });
  const followerCoords = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      
      // Update instant dot position immediately for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  // Global mouseover/scroll detector to automatically handle hover/text triggers
  useEffect(() => {
    const updateCursorForElement = (target: HTMLElement) => {
      if (!target) return;
      
      // Show native text cursor and hide custom follower over inputs/textareas
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable) {
        setCursorType("hidden");
        return;
      }

      const interactive = target.closest("a, button, [role='button'], .cursor-pointer, [data-cursor]");
      
      if (interactive) {
        const cursorAttr = interactive.getAttribute("data-cursor");
        if (cursorAttr === "text") {
          const textAttr = interactive.getAttribute("data-cursor-text") || "VIEW";
          setCursorType("text");
          setHoverText(textAttr);
        } else if (cursorAttr === "hidden") {
          setCursorType("hidden");
        } else {
          setCursorType("hover");
        }
      } else {
        setCursorType("default");
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateCursorForElement(e.target as HTMLElement);
    };

    const handleScroll = () => {
      const element = document.elementFromPoint(mouseCoords.current.x, mouseCoords.current.y);
      if (element) {
        updateCursorForElement(element as HTMLElement);
      }
    };

    const handleMouseDown = () => setCursorType("click");
    const handleMouseUp = () => setCursorType("hover");

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [setCursorType, setHoverText]);

  // Outer Follower Animation loop (stretching & lag tracking)
  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      const lerpFactor = 0.12; // trails smoothly behind
      
      const dx = mouseCoords.current.x - followerCoords.current.x;
      const dy = mouseCoords.current.y - followerCoords.current.y;
      
      followerCoords.current.x += dx * lerpFactor;
      followerCoords.current.y += dy * lerpFactor;
      
      // Calculate velocity for stretching
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate angle of motion
      let angle = 0;
      if (velocity > 0.1) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
      }
      
      // Limit stretch amount
      const stretch = Math.min(velocity * 0.007, 0.4);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch;
      
      if (followerRef.current) {
        // Do not stretch if displaying text or hover bounds to preserve shape and readability
        if (cursorType === "text" || cursorType === "hover") {
          followerRef.current.style.transform = `translate3d(${followerCoords.current.x}px, ${followerCoords.current.y}px, 0) scale(1)`;
        } else {
          followerRef.current.style.transform = `translate3d(${followerCoords.current.x}px, ${followerCoords.current.y}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
        }
      }
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorType]);

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("pathchange", handlePathChange);
    window.addEventListener("popstate", handlePathChange);
    return () => {
      window.removeEventListener("pathchange", handlePathChange);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  if (!isVisible || cursorType === "hidden") return null;

  const isDarkPage = currentPath.startsWith("/services/");

  // Custom styling states for cursor size and color
  const stylesMap = {
    default: isDarkPage
      ? "w-6 h-6 border border-white/40 bg-transparent"
      : "w-6 h-6 border border-[#1F4096]/30 bg-transparent",
    hover: isDarkPage
      ? "w-8 h-8 border border-white bg-white/10 scale-110"
      : "w-8 h-8 border border-[#1F4096] bg-[#1F4096]/5 scale-110",
    text: isDarkPage
      ? "w-14 h-14 bg-white text-[#0D1E3D] text-[10px] font-extrabold uppercase tracking-widest scale-100"
      : "w-14 h-14 bg-[#1F4096] text-white text-[10px] font-extrabold uppercase tracking-widest scale-100",
    click: isDarkPage
      ? "w-5 h-5 bg-white/20 border border-white/60 scale-90"
      : "w-5 h-5 bg-[#1F4096]/10 border border-[#1F4096]/50 scale-90"
  };

  return (
    <>
      {/* Instant Central Dot */}
      <div
        ref={dotRef}
        className={`hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] select-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isDarkPage ? "bg-white" : "bg-[#1F4096]"
        }`}
        style={{
          opacity: cursorType === "text" ? 0 : 1,
          willChange: "transform"
        }}
      />

      {/* Lagging Outer Follower */}
      <div
        ref={followerRef}
        className={`hidden md:flex fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full items-center justify-center z-[9999] select-none transition-all duration-300 ease-out ${
          stylesMap[cursorType as keyof typeof stylesMap] || stylesMap.default
        }`}
        style={{
          willChange: "transform"
        }}
      >
        {cursorType === "text" && hoverText && (
          <span className="animate-fade-in text-center leading-none px-2 select-none">{hoverText}</span>
        )}
      </div>
    </>
  );
};

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <CursorProvider>
        {/* Core Layout Wrapper */}
        <div className="relative min-h-screen selection:bg-slate-200 selection:text-slate-900">
          {/* Custom Cursor follower */}
          <CursorFollower />
          
          {children}
        </div>
      </CursorProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
