// components/Services.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  LinkIcon,
  Building,
  Layers,
  FileText,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollComplete, setScrollComplete] = useState(false);
  // Store the ScrollTrigger instance
  const scrollTriggerInstance = useRef<any>(null);
  // Use this ref to track the current active index to avoid state updates in onUpdate
  const activeIndexRef = useRef(0);

  const services = [
    {
      icon: Wrench,
      title: "Structural Steel Detailing",
      description:
        "End-to-end detailing with anchor bolt plans, shop drawings, and erection drawings, ensuring precision and compliance.",
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      bgDarkColor: "bg-gray-900",
    },
    {
      icon: LinkIcon,
      title: "Connection Design and Analysis",
      description:
        "Code-compliant designs (AISC, CSA, IS), engineered for safety and efficiency with advanced analysis.",
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      bgDarkColor: "bg-blue-950",
    },
    {
      icon: Building,
      title: "Pre-Engineered Building (PEB) Detailing",
      description:
        "Comprehensive primary and secondary framing, panels, trims, and accessories for efficient PEB projects.",
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      bgDarkColor: "bg-green-950",
    },
    {
      icon: Layers,
      title: "BIM Coordination Services",
      description:
        "Clash detection, coordination modeling, and LOD 400-ready deliverables for seamless project integration.",
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      bgDarkColor: "bg-purple-950",
    },
    {
      icon: FileText,
      title: "Fabrication Shop Drawings",
      description:
        "Accurate drawings with CNC-compatible outputs to streamline fabrication processes.",
      bgColor: "bg-orange-500/5 hover:bg-orange-500/10",
      bgDarkColor: "bg-teal-950",
    },
    {
      icon: BarChart3,
      title: "Material Take-off (ABM)",
      description:
        "Cost-efficient, estimation-ready bills of material to optimize budgeting and procurement.",
      bgColor: "bg-teal-500/5 hover:bg-teal-500/10",
      bgDarkColor: "bg-indigo-950",
    },
  ];

  useEffect(() => {
    // Skip creating ScrollTrigger if we're in a server environment
    if (typeof window === "undefined") return;

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Disable ScrollTrigger's automatic scroll restoration which causes the jumping
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    // Clean up any previous instance to prevent memory leaks
    if (scrollTriggerInstance.current) {
      scrollTriggerInstance.current.kill();
    }

    // Only create the ScrollTrigger if the refs are available
    if (!cardsContainerRef.current || !sectionRef.current) return;

    const totalCards = services.length;
    const cardWidth = window.innerWidth * 0.9; // 90% of viewport width for mobile
    const totalScrollWidth = cardWidth * (totalCards - 1);

    // Initialize card positions
    services.forEach((_, index) => {
      gsap.set(`#services-card-${index}`, {
        x: index * cardWidth,
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 0.9,
        zIndex: totalCards - index,
      });
    });

    // Create the ScrollTrigger instance with modified settings
    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${totalScrollWidth}`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,

      // Key fixes to prevent unwanted scrolling
      preventOverlaps: true,
      immediateRender: false,
      fastScrollEnd: true,

      onUpdate: (self) => {
        const progress = self.progress * (totalCards - 1);
        const newIndex = Math.min(Math.floor(progress), totalCards - 1);

        // Update the ref value without causing re-renders
        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          // Use requestAnimationFrame to batch this update with other UI updates
          requestAnimationFrame(() => {
            setActiveIndex(newIndex);
          });
        }

        // Track scroll completion state with the same pattern
        const isComplete = self.progress >= 0.99;
        if (isComplete !== scrollComplete) {
          requestAnimationFrame(() => {
            setScrollComplete(isComplete);
          });
        }

        // Update card positions
        services.forEach((_, index) => {
          const cardProgress = progress - index;
          const cardElement = `#services-card-${index}`;

          gsap.to(cardElement, {
            x: cardProgress * cardWidth,
            opacity: 1 - Math.abs(cardProgress),
            scale: 1 - Math.abs(cardProgress) * 0.1,
            zIndex: totalCards - index,
            duration: 0,
          });
        });
      },
    });

    // Handle resize to update card positions
    const handleResize = () => {
      if (scrollTriggerInstance.current) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    // Return cleanup function
    return () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
      }
      window.removeEventListener("resize", handleResize);
    };

    // Important: Remove activeIndex from the dependency array
  }, [services.length]); // Only recreate when services length changes

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
      // Add data attribute to identify this section for debugging
      data-section="services"
    >
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,_currentColor_1px,_transparent_1px),_linear-gradient(to_bottom,_currentColor_1px,_transparent_1px)] bg-[size:2rem_2rem]"></div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col h-full">
        <div className="text-center max-w-3xl mx-auto mb-6 pt-12 md:pt-16">
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
        </div>

        <div
          ref={cardsContainerRef}
          className="relative flex-1 flex items-center justify-center"
        >
          {services.map((service, index) => (
            <div
              id={`services-card-${index}`}
              key={index}
              className={`absolute w-full max-w-[90%] md:max-w-4xl mx-auto ${service.bgDarkColor} rounded-2xl border border-border/50`}
            >
              <div
                className={`group relative p-6 md:p-12 rounded-2xl glass ${service.bgColor} transition-all duration-300 border border-border/50`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pb-6 md:pb-8">
          <Button
            size="lg"
            className="rounded-full bg-struo-red hover:bg-struo-red/90 text-white px-6 py-3 text-sm md:text-base"
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
