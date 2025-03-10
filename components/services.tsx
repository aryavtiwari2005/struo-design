"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Building,
  LinkIcon,
  BarChart3,
  FileText,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import MagneticButton from "./magnetic-button";

export default function Services() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headingRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollComplete, setScrollComplete] = useState(false);

  const services = [
    {
      icon: Building,
      title: "Structure Steel Design/Detailing",
      description:
        "Comprehensive steel structure design and detailed engineering drawings crafted with precision and adherence to international standards. Our team ensures every project meets stringent safety requirements, optimizes material usage, and integrates seamlessly with architectural visions, delivering robust and sustainable solutions.",
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      bgDarkColor: "bg-gray-900",
    },
    {
      icon: LinkIcon,
      title: "Connection Design and Analysis",
      description:
        "Expert design and analysis of structural connections ensuring safety, efficiency, and compliance with industry regulations. We specialize in creating durable, load-bearing connections tailored to each project's unique demands, using advanced simulation tools to validate performance under real-world conditions.",
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      bgDarkColor: "bg-blue-950",
    },
    {
      icon: BarChart3,
      title: "Material Take-off (ABM)",
      description:
        "Accurate quantification and estimation of materials required for construction projects, optimizing cost and reducing waste. Our detailed material take-off services provide clients with precise data for budgeting, procurement, and scheduling, ensuring efficiency from planning to execution.",
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      bgDarkColor: "bg-green-950",
    },
    {
      icon: FileText,
      title: "Customized Reports",
      description:
        "Tailored engineering reports and documentation to meet specific client requirements and project specifications. We deliver comprehensive, easy-to-understand reports that include structural analysis, design summaries, and compliance details, empowering clients with actionable insights.",
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      bgDarkColor: "bg-purple-950",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      // Create a context for GSAP animations
      const servicesCtx = gsap.context(() => {
        if (cardsContainerRef.current && sectionRef.current) {
          const totalCards = services.length;
          const cardWidth = window.innerWidth * 0.9; // 90% of viewport width for mobile
          const totalScrollWidth = cardWidth * (totalCards - 1);

          services.forEach((_, index) => {
            gsap.set(`#services-card-${index}`, {
              x: index * cardWidth,
              opacity: index === 0 ? 1 : 0,
              scale: index === 0 ? 1 : 0.9,
              zIndex: totalCards - index,
            });
          });

          const scrollTrigger = ScrollTrigger.create({
            id: "services-cards-scroll",
            trigger: sectionRef.current,
            start: "top top", // Adjusted for mobile visibility
            end: `+=${totalScrollWidth}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.5, // Smoother on mobile
            onUpdate: (self) => {
              const progress = self.progress * (totalCards - 1);
              const newIndex = Math.min(Math.floor(progress), totalCards - 1);

              if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
              }

              if (self.progress >= 0.99) {
                setScrollComplete(true);
              } else {
                setScrollComplete(false);
              }

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
        }
      }, sectionRef); // Scope to sectionRef

      return () => {
        // Clean up all GSAP animations within this context
        servicesCtx.revert();

        // Additionally, explicitly kill any ScrollTrigger with our IDs
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.vars.id &&
            (trigger.vars.id === "services-heading-trigger" ||
              trigger.vars.id === "services-cards-scroll")
          ) {
            trigger.kill();
          }
        });
      };
    }
  }, [services.length, activeIndex]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden" // Changed to min-h-screen for mobile
    >
      <div className="absolute inset-0 z-0"></div>

      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "2rem 2rem", // Smaller grid for mobile
        }}
      ></div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col h-full">
        <div className="text-center max-w-3xl mx-auto mb-6 pt-12 md:pt-16">
          <span className="inline-block text-xs md:text-sm font-medium text-primary mb-2 md:mb-4 gsap-reveal">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 gsap-reveal">
            Comprehensive Structural Engineering Solutions
          </h2>
          <p className="text-sm md:text-base text-muted-foreground gsap-reveal">
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
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
                  {service.title}
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center pb-6 md:pb-8 opacity-0 transition-opacity duration-500 ${
            scrollComplete ? "opacity-100" : ""
          }`}
        >
          <MagneticButton>
            <Button
              size="lg" // Smaller on mobile
              className="rounded-full bg-struo-red text-white text-sm md:text-base"
            >
              View All Services
              <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
