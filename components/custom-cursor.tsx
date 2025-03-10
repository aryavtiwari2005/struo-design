"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleLinkHover = () => {
      setCursorVariant("link");
    };

    const handleLinkLeave = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add event listeners for all links and buttons
    const links = document.querySelectorAll("a, button, .magnetic-target");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, []);

  // Update event listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const links = document.querySelectorAll("a, button, .magnetic-target");

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => setCursorVariant("link"));
        link.addEventListener("mouseleave", () => setCursorVariant("default"));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      opacity: isVisible ? 1 : 0,
    },
    link: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1.5,
      opacity: isVisible ? 1 : 0,
    },
  };

  const outlineVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      opacity: isVisible ? 0.5 : 0,
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      opacity: isVisible ? 0.5 : 0,
    },
  };

  return (
    <>
      <motion.div
        className="custom-cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="cursor-dot bg-struo-red"></div>
      </motion.div>
      <motion.div
        className="custom-cursor"
        variants={outlineVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
          delay: 0.03,
        }}
      >
        <div className="cursor-outline border-struo-red"></div>
      </motion.div>
    </>
  );
}
