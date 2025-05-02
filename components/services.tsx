"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { TouchEvent as ReactTouchEvent } from "react";
import {
  Wrench,
  LinkIcon,
  Building,
  Layers,
  FileText,
  BarChart3,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 50; // Minimum distance required for a swipe

  const services = [
    {
      icon: Wrench,
      title: "Structural Steel Detailing",
      description:
        "End-to-end detailing with anchor bolt plans, shop drawings, and erection drawings, ensuring precision and compliance.",
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      darkColor: "from-gray-900/95 to-gray-900/90",
    },
    {
      icon: LinkIcon,
      title: "Connection Design and Analysis",
      description:
        "Code-compliant designs (AISC, CSA, IS), engineered for safety and efficiency with advanced analysis.",
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      darkColor: "from-blue-950/95 to-blue-950/90",
    },
    {
      icon: Building,
      title: "Pre-Engineered Building (PEB) Detailing",
      description:
        "Comprehensive primary and secondary framing, panels, trims, and accessories for efficient PEB projects.",
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      darkColor: "from-green-950/95 to-green-950/90",
    },
    {
      icon: Layers,
      title: "BIM Coordination Services",
      description:
        "Clash detection, coordination modeling, and LOD 400-ready deliverables for seamless project integration.",
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      darkColor: "from-purple-950/95 to-purple-950/90",
    },
    {
      icon: FileText,
      title: "Fabrication Shop Drawings",
      description:
        "Accurate drawings with CNC-compatible outputs to streamline fabrication processes.",
      bgColor: "bg-orange-500/5 hover:bg-orange-500/10",
      darkColor: "from-teal-950/95 to-teal-950/90",
    },
    {
      icon: BarChart3,
      title: "Material Take-off (ABM)",
      description:
        "Cost-efficient, estimation-ready bills of material to optimize budgeting and procurement.",
      bgColor: "bg-teal-500/5 hover:bg-teal-500/10",
      darkColor: "from-indigo-950/95 to-indigo-950/90",
    },
  ];

  const nextService = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevService = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent | TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    // Check if the swipe distance is significant enough
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swiped left, go to next
        nextService();
      } else {
        // Swiped right, go to previous
        prevService();
      }
    }
  };

  // Add touch event listeners to the carousel container
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const touchStartHandler = (e: TouchEvent) => handleTouchStart(e);
      const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e);
      const touchEndHandler = () => handleTouchEnd();

      carousel.addEventListener("touchstart", touchStartHandler, {
        passive: true,
      });
      carousel.addEventListener("touchmove", touchMoveHandler, {
        passive: true,
      });
      carousel.addEventListener("touchend", touchEndHandler, { passive: true });

      return () => {
        carousel.removeEventListener("touchstart", touchStartHandler);
        carousel.removeEventListener("touchmove", touchMoveHandler);
        carousel.removeEventListener("touchend", touchEndHandler);
      };
    }
  }, []);

  // Variants for framer-motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="services"
      className="relative min-h-screen bg-background text-foreground flex items-center py-10 md:py-10"
      data-section="services"
    >
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,_currentColor_1px,_transparent_1px),_linear-gradient(to_bottom,_currentColor_1px,_transparent_1px)] bg-[size:2rem_2rem]"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm font-medium text-primary mb-2 md:mb-4 text-foreground">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground">
            Our Core Services
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            We offer a wide range of specialized services designed to meet the
            unique needs of our clients and deliver exceptional results.
          </p>
        </motion.div>

        {/* Desktop View: Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`rounded-2xl bg-gradient-to-br ${service.darkColor} border border-border/50 overflow-hidden`}
            >
              <div
                className={`h-full p-6 ${service.bgColor} transition-all duration-300 border border-border/50 rounded-2xl`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View: Swipeable Carousel */}
        <div className="md:hidden relative mb-8">
          {/* Swipeable Carousel container */}
          <div
            ref={carouselRef}
            className="relative h-[250px] overflow-hidden rounded-2xl touch-pan-y cursor-grab active:cursor-grabbing"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${service.darkColor} border border-border/50 overflow-hidden`}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x:
                    activeIndex === index
                      ? 0
                      : activeIndex > index
                      ? -100
                      : 100,
                  zIndex: activeIndex === index ? 10 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className={`h-full p-6 ${service.bgColor} transition-all duration-300 border border-border/50 rounded-2xl`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Swipe hint message */}
          <div className="text-center text-xs text-muted-foreground mt-3 mb-1">
            <span>← Swipe to navigate →</span>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-1">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/40"
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-struo-red hover:bg-struo-red/90 text-white px-6 py-3 text-sm md:text-base"
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
