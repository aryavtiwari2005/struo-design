"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import MagneticButton from "./magnetic-button";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Split text for animation
    if (textRef.current && subtitleRef.current) {
      const titleText = new SplitType(textRef.current, {
        types: "chars,words",
      });
      const subtitleText = new SplitType(subtitleRef.current, {
        types: "lines",
      });

      gsap.from(titleText.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(subtitleText.lines, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }

    if (heroRef.current) {
      gsap.to(".hero-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50"></div>
        <div className="hero-parallax absolute -top-[20%] -right-[10%] w-[50%] h-[70%] bg-struo-red/5 rounded-full blur-3xl"></div>
        <div className="hero-parallax absolute top-[30%] -left-[10%] w-[40%] h-[60%] bg-struo-red/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to_right, currentColor 1px, transparent 1px), linear-gradient(to_bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      ></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4"
          >
            Welcome to StruoIndia Engineering Services
          </motion.div>

          <h1
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight"
          >
            Precision, Partnership, Performance
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl"
          >
            Leading provider of structural steel detailing, connection design,
            and BIM coordination services. Trusted by global clients for quality
            and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <MagneticButton>
              <Button size="lg" className="rounded-full group">
                Our Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="outline" className="rounded-full">
                View Projects
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <Link
          href="#about"
          className="flex flex-col items-center text-sm text-muted-foreground"
        >
          <span className="mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div
              animate={{ height: [0, 8, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
              }}
              className="w-1 bg-primary rounded-full"
            />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
