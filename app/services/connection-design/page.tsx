"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  LinkIcon,
  Calculator,
  FileText,
  Lightbulb,
  Shield,
  Wrench,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/magnetic-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function ConnectionDesignPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallax = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, 10]);

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

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.querySelectorAll(".feature-item"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Process animation
    if (processRef.current) {
      gsap.fromTo(
        processRef.current.querySelectorAll(".process-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Examples animation
    if (examplesRef.current) {
      gsap.fromTo(
        examplesRef.current.querySelectorAll(".example-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: examplesRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const connectionTypes = [
    {
      icon: LinkIcon,
      title: "Moment Connections",
      description:
        "Custom-designed moment connections that effectively transfer bending moments while optimizing material usage and fabrication complexity.",
      features: [
        "End plate connections",
        "Direct welded connections",
        "Custom solutions for seismic areas",
        "Efficient moment transfer design",
      ],
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      borderColor: "border-struo-red/20",
      iconBg: "bg-struo-red/10",
    },
    {
      icon: Shield,
      title: "Shear Connections",
      description:
        "Efficient shear connections designed for optimal load transfer with minimal material and simplified fabrication requirements.",
      features: [
        "Bolted shear tabs",
        "Single and double angle connections",
        "Coped beam connections",
        "Extended shear tabs",
      ],
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
    },
    {
      icon: Wrench,
      title: "Base Plates & Anchor Bolts",
      description:
        "Precise base plate and anchor bolt designs that ensure proper load distribution between steel structure and foundation.",
      features: [
        "Moment-resisting base plates",
        "Standard column base plates",
        "Oversized hole solutions",
        "Anchor bolt layouts and details",
      ],
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/10",
    },
    {
      icon: FileText,
      title: "Bracing Connections",
      description:
        "Specialized bracing connections engineered to handle high axial loads and provide lateral stability to the structure.",
      features: [
        "Gusset plate connections",
        "Knife connections",
        "Slotted HSS connections",
        "Multi-member intersections",
      ],
      bgColor: "bg-teal-500/5 hover:bg-teal-500/10",
      borderColor: "border-teal-500/20",
      iconBg: "bg-teal-500/10",
    },
    {
      icon: Calculator,
      title: "Complex Truss Joints",
      description:
        "Detailed engineering of complex truss joints that efficiently distribute forces while maintaining constructability.",
      features: [
        "HSS truss connections",
        "Multi-member nodes",
        "Welded and bolted solutions",
        "Custom plate connections",
      ],
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-green-500/10",
    },
    {
      icon: Lightbulb,
      title: "Value Engineering",
      description:
        "Cost-effective connection solutions that maintain structural integrity while reducing material usage and simplifying fabrication.",
      features: [
        "Material optimization",
        "Fabrication-friendly details",
        "Constructability review",
        "Alternative connection designs",
      ],
      bgColor: "bg-orange-500/5 hover:bg-orange-500/10",
      borderColor: "border-orange-500/20",
      iconBg: "bg-orange-500/10",
    },
  ];

  const designProcess = [
    {
      number: "01",
      title: "Analysis & Requirement Review",
      description:
        "We analyze your project specifications, load requirements, and design criteria to establish connection parameters.",
    },
    {
      number: "02",
      title: "Code Selection & Force Determination",
      description:
        "Our engineers select the appropriate design code (AISC, CSA, IS) and determine governing forces for each connection.",
    },
    {
      number: "03",
      title: "Preliminary Design",
      description:
        "We develop initial connection designs optimized for strength, economy, and constructability using specialized software.",
    },
    {
      number: "04",
      title: "Detailed Analysis",
      description:
        "Each connection undergoes comprehensive analysis for various failure modes and load conditions to ensure safety.",
    },
    {
      number: "05",
      title: "Value Engineering",
      description:
        "Our team optimizes each connection for material usage, fabrication complexity, and erection requirements.",
    },
    {
      number: "06",
      title: "Final Documentation",
      description:
        "We deliver complete design calculations, connection sketches, and Tekla-compatible models with rigorous QA reviews.",
    },
  ];

  const deliverables = [
    {
      title: "Signed Design Calculations",
      description:
        "Comprehensive calculations documenting load analysis, code compliance, and safety factors for every connection type.",
      icon: Calculator,
    },
    {
      title: "Connection Sketches & Models",
      description:
        "Detailed connection drawings and 3D models that clearly communicate design intent to fabricators and erectors.",
      icon: FileText,
    },
    {
      title: "Tekla-Compatible Designs",
      description:
        "Connection designs ready for implementation in Tekla or other detailing software for seamless project integration.",
      icon: LinkIcon,
    },
    {
      title: "QA Checklists & Review Notes",
      description:
        "Thorough quality assurance documentation ensuring every connection meets project requirements and code standards.",
      icon: CheckCircle2,
    },
  ];

  const codeComplianceIcons = [
    { name: "AISC", image: "/aisc-logo.svg" },
    { name: "CSA", image: "/csa-logo.svg" },
    { name: "IS", image: "/is-logo.svg" },
    { name: "IBC", image: "/ibc-logo.svg" },
    { name: "Eurocode", image: "/eurocode-logo.svg" },
  ];

  return (
    <>
      <Navbar />
      <section
        id="connection-design"
        ref={sectionRef}
        className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-background text-foreground"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-primary/5 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-1/3 right-1/4 w-[40%] h-[40%] bg-struo-red/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,_currentColor_1px,_transparent_1px),_linear-gradient(to_bottom,_currentColor_1px,_transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="container relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <div ref={heroRef} className="relative mb-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 mb-4 gsap-reveal">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Connection Design
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6 gsap-reveal">
                Smart. Safe.{" "}
                <span className="text-struo-red">Code-Compliant.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 gsap-reveal max-w-3xl mx-auto">
                Our in-house engineers provide connection design services
                adhering to AISC, CSA, IS codes, ensuring structural integrity
                with ease of fabrication.
              </p>

              {/* <div className="flex flex-wrap justify-center gap-4 gsap-reveal">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-8 py-6 text-lg"
                  >
                    Request Design Services
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-8 py-6 text-lg"
                  >
                    View Sample Projects
                  </Button>
                </MagneticButton>
              </div> */}
            </div>

            {/* Decorative elements */}
            <div className="hidden lg:block">
              <motion.div
                style={{ y: parallax, rotate: rotateLeft }}
                className="absolute -top-10 -left-10 w-48 h-48 bg-struo-red/5 rounded-3xl blur-xl"
              ></motion.div>
              <motion.div
                style={{ y: parallax, rotate: rotateRight }}
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-3xl blur-xl"
              ></motion.div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="relative mb-32 py-12 px-8 bg-secondary/20 rounded-3xl border border-border/20">
            <div className="absolute inset-0 bg-gradient-to-r from-struo-red/5 to-primary/5 rounded-3xl opacity-50"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Value Engineering Included
              </h2>
              <p className="text-lg text-muted-foreground">
                Our team re-evaluates every connection to optimize cost and
                erection feasibility without compromising code requirements. We
                balance safety, economy, and constructability to deliver the
                most efficient connection solutions for your project.
              </p>
            </div>
          </div>

          {/* Connection Types Grid */}
          <div ref={featuresRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  What We Design
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground feature-item">
                Specialized Connection Solutions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground feature-item max-w-2xl mx-auto">
                From simple shear tabs to complex moment-resisting joints, our
                engineers design connections that meet your project's unique
                requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {connectionTypes.map((connection, index) => (
                <motion.div
                  key={index}
                  className={`feature-item ${connection.bgColor} p-8 rounded-2xl shadow-md border ${connection.borderColor} transition-all duration-300 h-full flex flex-col`}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${connection.iconBg} flex items-center justify-center mb-6`}
                  >
                    <connection.icon className="h-7 w-7 text-foreground" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {connection.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {connection.description}
                  </p>

                  <div className="mt-auto">
                    <ul className="space-y-2">
                      {connection.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-struo-red mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div ref={processRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Design Process
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground process-item">
                How We Create Safe, Efficient Connections
              </h2>
              <p className="mt-4 text-lg text-muted-foreground process-item max-w-2xl mx-auto">
                Our structured approach ensures every connection meets code
                requirements while optimizing for fabrication ease and material
                efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designProcess.map((step, index) => (
                <motion.div
                  key={index}
                  className="process-item bg-secondary/10 hover:bg-secondary/20 p-8 rounded-2xl border border-border/20 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl font-bold text-struo-red/20">
                      {step.number}
                    </span>
                    <div className="h-px flex-grow bg-border/30 mx-4"></div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Connection Examples */}
          <div
            ref={examplesRef}
            className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="rounded-2xl overflow-hidden h-80 relative example-item">
              <Image
                src="/connection-design-1.jpg"
                alt="Moment Connection Detail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Extended End Plate Moment Connection
                  </h3>
                  <p className="text-white/80 text-sm">
                    High-capacity moment transfer with optimized plate thickness
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-80 relative example-item">
              <Image
                src="/connection-design-2.jpg"
                alt="Bracing Connection Detail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Multi-Member Bracing Connection
                  </h3>
                  <p className="text-white/80 text-sm">
                    Complex gusset plate design for efficient load transfer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Deliverables
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                What You Receive
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive deliverables include everything you need to
                implement our connection designs efficiently in your fabrication
                and construction process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {deliverables.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary/10 p-8 rounded-2xl border border-border/20 flex"
                >
                  <div className="w-14 h-14 rounded-2xl bg-struo-red/10 flex items-center justify-center mr-6 flex-shrink-0">
                    <item.icon className="h-7 w-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Compliance */}
          <div className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Industry Standard Compliance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our connection designs adhere to all major international and
                regional structural codes.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {codeComplianceIcons.map((icon, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-xl flex items-center justify-center mb-3">
                    <Image
                      src={icon.image}
                      alt={icon.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <p className="text-sm font-medium">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            ref={ctaRef}
            className="bg-gradient-to-r from-struo-red/10 to-primary/10 rounded-3xl p-12 border border-border/20 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-struo-red/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Need Expert Connection Design?
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our structural engineers are ready to design safe, economical,
                and fabrication-friendly connections for your next project.
                Contact us today to discuss your requirements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-8"
                  >
                    Request Design Services
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-8"
                    >
                      Contact Our Team
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
