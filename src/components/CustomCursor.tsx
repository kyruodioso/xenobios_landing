"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, input, a, [data-interactive]');
      
      if (isInteractive) {
        setIsHovering(true);
        if (target.closest('[data-tooltip]')) {
          setTooltipText(target.closest('[data-tooltip]')?.getAttribute('data-tooltip') || "");
        } else if (target.closest('button, input')) {
          setTooltipText("Te estaba esperando, Ánima");
        }
      } else {
        setIsHovering(false);
        setTooltipText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Glow (Infection of Life) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-[#00FFFF]/20 rounded-full pointer-events-none z-[9999] blur-2xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2.5 : 1.5,
        }}
      />
      {/* Middle Glow */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-[#00FFFF]/40 rounded-full pointer-events-none z-[9999] blur-lg"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.8 : 1,
        }}
      />
      {/* Inner Core */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] shadow-[0_0_20px_#00FFFF,0_0_10px_#00FFFF,0_0_5px_#fff]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {tooltipText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed pointer-events-none z-[9999] px-3 py-1 bg-cyan-950/80 border border-cyan-500/30 rounded text-[10px] text-cyan-300 font-sans uppercase tracking-widest backdrop-blur-sm shadow-lg"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "20px",
            translateY: "-20px",
          }}
        >
          {tooltipText}
        </motion.div>
      )}
    </>
  );
}
