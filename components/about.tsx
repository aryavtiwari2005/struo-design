"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Lightbulb, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./magnetic-button";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      gsap.from(textRef.current.querySelectorAll(".gsap-reveal"), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });
    }

    if (statsRef.current) {
      gsap.from(statsRef.current.querySelectorAll(".stat-item"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  const stats = [
    { icon: Building2, value: "500+", label: "Projects Completed" },
    { icon: Users, value: "100+", label: "Happy Clients" },
    { icon: Lightbulb, value: "15+", label: "Years Experience" },
    { icon: Award, value: "25+", label: "Industry Awards" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-secondary/50 dark:bg-secondary/20"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={textRef} className="order-2 lg:order-1">
            <span className="inline-block text-sm font-medium text-primary mb-4 gsap-reveal">
              About StruoIndia
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">
              Revolutionizing Structural Engineering with Precision and
              Innovation
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="gsap-reveal">
                StruoIndia is a leading provider of structural engineering
                consultancy services, specializing in Structure Steel
                Design/Detailing, Connection Design and Analysis, Material
                Take-off (ABM), and customized reports tailored to client
                specifications.
              </p>
              <p className="gsap-reveal">
                With a commitment to excellence and innovation, we deliver
                comprehensive solutions that exceed industry standards and
                fulfill the unique needs of our clients. Our team of highly
                skilled professionals, coupled with state-of-the-art
                infrastructure and advanced technologies, ensures precision,
                reliability, and efficiency in every project we undertake.
              </p>
              <p className="gsap-reveal">
                At StruoIndia, we strive to revolutionize the structural
                engineering industry, driving sustainable growth and making a
                positive impact on the built environment.
              </p>
            </div>
            <div className="mt-8 gsap-reveal">
              <MagneticButton>
                <Button className="rounded-full group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <motion.div
              style={{ y }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl neumorphic"
            >
              <Image
                src="/about.jpg"
                alt="StruoIndia Office"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 md:mt-32"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item flex flex-col items-center text-center p-6 rounded-xl glass"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
