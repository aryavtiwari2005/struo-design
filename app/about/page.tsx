"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Award, Building, Users, Zap } from "lucide-react";
import MagneticButton from "@/components/magnetic-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

// Fade in animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Stagger animation for lists
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function About() {
  // Refs for intersection observers
  const heroRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // InView hooks replace GSAP ScrollTrigger
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const isDetailsInView = useInView(detailsRef, { once: true, amount: 0.2 });
  const isIndustriesInView = useInView(industriesRef, {
    once: true,
    amount: 0.2,
  });
  const isQuoteInView = useInView(quoteRef, { once: true, amount: 0.2 });
  const isHistoryInView = useInView(historyRef, { once: true, amount: 0.2 });

  const details = [
    {
      icon: Award,
      text: "20+ years of experience",
      description:
        "Delivering excellence in structural steel detailing since 2003",
    },
    {
      icon: Globe,
      text: "Serving 100+ clients in 7+ countries",
      description: "Global reach with local expertise across continents",
    },
    {
      icon: Zap,
      text: "ISO-compliant QA processes",
      description:
        "Rigorous quality standards ensuring precision in every project",
    },
    {
      icon: Users,
      text: "Expert teams trained in Tekla, SDS/2, and AutoCAD",
      description: "Skilled professionals using cutting-edge industry software",
    },
  ];

  const industries = [
    {
      title: "Commercial & Industrial Construction",
      description:
        "Office buildings, retail spaces, warehouses, and manufacturing facilities",
      icon: Building,
    },
    {
      title: "Infrastructure & Transportation",
      description:
        "Bridges, highways, airports, and public transit infrastructure",
      icon: Globe,
    },
    {
      title: "Oil & Gas & EPC",
      description:
        "Refineries, processing plants, and energy production facilities",
      icon: Zap,
    },
    {
      title: "Pre-Engineered Buildings",
      description: "Customized metal building systems for quick deployment",
      icon: Award,
    },
  ];

  const timeline = [
    {
      year: "2003",
      title: "Founded in Delhi",
      description: "Started as a small team of 5 specialists",
    },
    {
      year: "2008",
      title: "International Expansion",
      description: "Opened our first international office in Canada",
    },
    {
      year: "2015",
      title: "ISO Certification",
      description:
        "Achieved ISO 9001:2015 certification for quality management",
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Fully integrated BIM workflow across all projects",
    },
  ];

  return (
    <>
      <Navbar />
      <section
        id="about"
        className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-background text-foreground"
      >
        {/* Simplified background elements with reduced opacity for better performance */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        >
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-2xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-2xl opacity-30" />
        </div>

        <div className="container relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <div
            ref={heroRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-24 md:mb-32"
          >
            <motion.div
              className="lg:col-span-6 space-y-6"
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center space-x-2"
                variants={fadeInVariants}
              >
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  About StruoIndia
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold leading-tight text-foreground"
                variants={fadeInVariants}
              >
                Trusted By Global Clients for{" "}
                <span className="text-struo-red">20+ Years</span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                variants={fadeInVariants}
              >
                StruoIndia Engineering Services Pvt. Ltd. is a leading
                structural steel detailing company with offices in New Delhi,
                India and British Columbia, Canada. We bring precision,
                innovation, and reliability to every project we undertake.
              </motion.p>

              <motion.div className="pt-4" variants={fadeInVariants}>
                <MagneticButton>
                  <Link href="/services">
                    <Button
                      size="lg"
                      className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6 py-5 text-base"
                    >
                      Discover Our Services
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src="/about.jpg"
                    alt="StruoIndia Project"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    loading="eager"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-sm font-medium text-foreground">
                    Our commitment to excellence has made us a trusted partner
                    for structural steel solutions worldwide.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Details Section */}
          <div ref={detailsRef} className="mb-24 md:mb-32">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              initial="hidden"
              animate={isDetailsInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center space-x-2 mb-4"
                variants={fadeInVariants}
              >
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Expertise
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                variants={fadeInVariants}
              >
                What Sets Us Apart
              </motion.h2>
              <motion.p
                className="mt-4 text-lg text-muted-foreground"
                variants={fadeInVariants}
              >
                Our comprehensive approach combines industry experience with
                technical excellence
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate={isDetailsInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary/30 hover:bg-secondary/50 p-6 rounded-xl shadow border border-border/20 transition-all duration-300"
                  variants={fadeInVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-struo-red/10 flex items-center justify-center mb-4">
                    <detail.icon className="h-6 w-6 text-struo-red" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {detail.text}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {detail.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quote Section */}
          <motion.div
            ref={quoteRef}
            className="mb-24 md:mb-32 py-12 px-6 md:px-12 bg-struo-red/5 rounded-2xl border border-struo-red/20 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isQuoteInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.6 }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 pointer-events-none"
            >
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-struo-red/10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <svg
                className="w-12 h-12 mx-auto mb-6 text-struo-red/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                We don't just deliver drawings—we deliver confidence in every
                structural steel project we undertake.
              </h2>

              <p className="text-base md:text-lg text-muted-foreground mb-8">
                From complex industrial facilities to iconic commercial
                buildings, our attention to detail and commitment to excellence
                has made us a trusted partner for clients worldwide.
              </p>

              <div className="flex justify-center">
                <MagneticButton>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-6"
                    >
                      Contact Us Today
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* History Timeline Section */}
          <div ref={historyRef} className="mb-24 md:mb-32">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              initial="hidden"
              animate={isHistoryInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center space-x-2 mb-4"
                variants={fadeInVariants}
              >
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Journey
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                variants={fadeInVariants}
              >
                Two Decades of Excellence
              </motion.h2>
              <motion.p
                className="mt-4 text-lg text-muted-foreground"
                variants={fadeInVariants}
              >
                Our growth story from inception to industry leadership
              </motion.p>
            </motion.div>

            <motion.div
              className="relative border-l-2 border-struo-red/30 pl-6 ml-4 md:ml-0 md:mx-auto md:max-w-3xl"
              initial="hidden"
              animate={isHistoryInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="mb-10"
                  variants={fadeInVariants}
                >
                  <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full border-2 border-struo-red bg-background"></div>
                  <div className="bg-secondary/30 rounded-xl p-5 border border-border/20">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-struo-red rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Industries Section */}
          <div ref={industriesRef} className="mb-24 md:mb-32">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              initial="hidden"
              animate={isIndustriesInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center space-x-2 mb-4"
                variants={fadeInVariants}
              >
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Industries
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                variants={fadeInVariants}
              >
                We Work With Clients In
              </motion.h2>
              <motion.p
                className="mt-4 text-lg text-muted-foreground"
                variants={fadeInVariants}
              >
                Delivering specialized steel detailing solutions across diverse
                sectors
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate={isIndustriesInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary/30 hover:bg-secondary/50 p-6 rounded-xl shadow border border-border/20 transition-all duration-300"
                  variants={fadeInVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-struo-red/10 flex items-center justify-center mb-4">
                    <industry.icon className="h-5 w-5 text-struo-red" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {industry.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section - Simple fade in */}
          <motion.div
            className="text-center bg-secondary/30 rounded-xl p-8 md:p-10 border border-border/20"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isIndustriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Ready to collaborate on your next project?
            </h3>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
              Our team of experts is ready to bring your structural steel vision
              to life with precision, innovation, and unwavering commitment to
              quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Button className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-6"
                  >
                    Contact Our Team
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
