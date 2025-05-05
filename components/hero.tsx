"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./magnetic-button";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]); // Reduced parallax intensity

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-32"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto"
        >
          <motion.div
            variants={childVariants}
            className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            Welcome to StruoIndia Engineering Services
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Precision, Partnership, Performance
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl"
          >
            Leading provider of structural steel detailing, connection design,
            and BIM coordination services.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <MagneticButton>
              <Link href="/services">
                <Button size="lg" className="rounded-full group">
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="rounded-full">
                  View Projects
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ y }}
        className="absolute top-[30%] left-0 w-[40%] h-[60%] bg-struo-red/10 rounded-full blur-xl hidden md:block"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
      >
        <Link
          href="#about"
          className="flex flex-col items-center text-sm text-muted-foreground"
        >
          <span className="mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div
              animate={{ height: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 bg-primary rounded-full"
            />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
