// app/about/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Award, Building, Users, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/magnetic-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".gsap-reveal"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Details animation
    if (detailsRef.current) {
      gsap.fromTo(
        detailsRef.current.querySelectorAll(".detail-item"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Industries animation
    if (industriesRef.current) {
      gsap.fromTo(
        industriesRef.current.querySelectorAll(".industry-item"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: industriesRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Quote animation
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // History animation
    if (historyRef.current) {
      gsap.fromTo(
        historyRef.current.querySelectorAll(".history-item"),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
        ref={sectionRef}
        className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-background text-foreground"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-primary/5 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-1/2 right-1/4 w-[30%] h-[30%] bg-struo-red/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,_currentColor_1px,_transparent_1px),_linear-gradient(to_bottom,_currentColor_1px,_transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="container relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <div
            ref={heroRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32"
          >
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 gsap-reveal">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  About StruoIndia
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground gsap-reveal">
                Trusted By Global Clients for{" "}
                <span className="text-struo-red">20+ Years</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed gsap-reveal">
                StruoIndia Engineering Services Pvt. Ltd. is a leading
                structural steel detailing company with offices in New Delhi,
                India and British Columbia, Canada. We bring precision,
                innovation, and reliability to every project we undertake.
              </p>

              <div className="pt-4 gsap-reveal">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-8 py-6 text-lg"
                  >
                    Discover Our Services
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </MagneticButton>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-struo-red/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>

              <motion.div
                style={{ y, opacity }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src="/about.jpg"
                    alt="StruoIndia Project"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-sm font-medium text-foreground">
                    Our commitment to excellence has made us a trusted partner
                    for structural steel solutions worldwide.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Details Section */}
          <div ref={detailsRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Expertise
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground detail-item">
                What Sets Us Apart
              </h2>
              <p className="mt-4 text-lg text-muted-foreground detail-item">
                Our comprehensive approach combines industry experience with
                technical excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="detail-item bg-secondary/30 hover:bg-secondary/50 p-8 rounded-2xl shadow-lg border border-border/20 transition-all duration-300"
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-struo-red/10 flex items-center justify-center mb-6">
                    <detail.icon className="h-7 w-7 text-struo-red" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {detail.text}
                  </h3>
                  <p className="text-muted-foreground">{detail.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote Section */}
          <div
            ref={quoteRef}
            className="mb-32 py-16 px-8 md:px-16 bg-struo-red/5 rounded-3xl border border-struo-red/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-struo-red/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <svg
                className="w-16 h-16 mx-auto mb-6 text-struo-red/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                We don't just deliver drawings—we deliver confidence in every
                structural steel project we undertake.
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                From complex industrial facilities to iconic commercial
                buildings, our attention to detail and commitment to excellence
                has made us a trusted partner for clients worldwide.
              </p>

              <div className="flex justify-center">
                <MagneticButton>
                  <Button
                    variant="outline"
                    className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-8"
                  >
                    Contact Us Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* History Timeline Section */}
          <div ref={historyRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Journey
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground history-item">
                Two Decades of Excellence
              </h2>
              <p className="mt-4 text-lg text-muted-foreground history-item">
                Our growth story from inception to industry leadership
              </p>
            </div>

            <div className="relative border-l-2 border-struo-red/30 pl-8 ml-4 md:ml-0 md:mx-auto md:max-w-3xl">
              {timeline.map((item, index) => (
                <div key={index} className="mb-12 history-item">
                  <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full border-2 border-struo-red bg-background"></div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border/20">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-struo-red rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industries Section */}
          <div ref={industriesRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Industries
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground industry-item">
                We Work With Clients In
              </h2>
              <p className="mt-4 text-lg text-muted-foreground industry-item">
                Delivering specialized steel detailing solutions across diverse
                sectors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  className="industry-item group bg-secondary/30 hover:bg-secondary/50 p-8 rounded-2xl shadow-md border border-border/20 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-struo-red/10 flex items-center justify-center mb-4 group-hover:bg-struo-red/20 transition-all duration-300">
                    <industry.icon className="h-6 w-6 text-struo-red" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {industry.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-secondary/30 rounded-3xl p-12 border border-border/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Ready to collaborate on your next project?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Our team of experts is ready to bring your structural steel vision
              to life with precision, innovation, and unwavering commitment to
              quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Button
                  size="lg"
                  className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-8"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-8"
                >
                  Contact Our Team
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
