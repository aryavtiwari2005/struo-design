"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Clock, Map, Wrench } from "lucide-react";

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const stats = [
    { icon: Globe, value: "100+", label: "Clients" },
    { icon: Clock, value: "20+", label: "Years" },
    { icon: Map, value: "7", label: "Countries" },
    { icon: Wrench, value: "6", label: "Core Services" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-background text-foreground"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block text-sm font-medium text-primary mb-4 text-foreground">
              About StruoIndia
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Trusted By Global Clients for 20+ Years
            </h2>
            <p className="text-muted-foreground">
              At StruoIndia, we specialize in delivering high-precision
              Structural Steel Detailing, Connection Design, and BIM
              Coordination services tailored for the modern construction
              industry.
            </p>
            <div className="mt-8">
              <Button className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6 py-3">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <motion.div
              style={{ y }}
              className="relative rounded-2xl overflow-hidden"
            >
              <Image
                src="/about.jpg"
                alt="StruoIndia Office"
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 md:mt-32"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-background/50 text-foreground"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-1 text-foreground">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
