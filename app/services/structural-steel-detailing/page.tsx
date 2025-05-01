"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Wrench,
  LinkIcon,
  Building,
  Layers,
  FileText,
  PieChart,
  Ruler,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/magnetic-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function StructuralSteelDetailing() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
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

    // Services animation
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.querySelectorAll(".service-item"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Benefits animation
    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current.querySelectorAll(".benefit-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
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

  const detailingServices = [
    {
      icon: FileText,
      title: "General Arrangement Drawings (GAD)",
      description:
        "Comprehensive layouts showing overall structural elements, dimensions, and relationships between components.",
      features: [
        "Grid lines & dimensions",
        "Column & beam placements",
        "Elevation views",
        "Cross-section references",
      ],
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      borderColor: "border-struo-red/20",
      iconBg: "bg-struo-red/10",
    },
    {
      icon: Wrench,
      title: "Shop Drawings",
      description:
        "Detailed fabrication-ready drawings with precise measurements and specifications for production.",
      features: [
        "Component dimensions",
        "Material specifications",
        "Cutting & drilling details",
        "Assembly instructions",
      ],
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
    },
    {
      icon: Building,
      title: "Anchor Bolt Setting Plans",
      description:
        "Accurate foundation plans showing anchor bolt layouts, embedment details, and foundation connections.",
      features: [
        "Bolt layout & dimensions",
        "Embedment specifications",
        "Base plate details",
        "Leveling requirements",
      ],
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/10",
    },
    {
      icon: Layers,
      title: "Erection Drawings",
      description:
        "Clear guidance for on-site assembly with marking plans, sequences, and installation details.",
      features: [
        "Assembly sequences",
        "Marking & identification",
        "Connection details",
        "Equipment requirements",
      ],
      bgColor: "bg-teal-500/5 hover:bg-teal-500/10",
      borderColor: "border-teal-500/20",
      iconBg: "bg-teal-500/10",
    },
    {
      icon: PieChart,
      title: "Bill of Materials (ABM)",
      description:
        "Comprehensive material lists with quantities, specifications, and weights for procurement planning.",
      features: [
        "Material types & grades",
        "Quantity takeoffs",
        "Weight calculations",
        "Cost estimation support",
      ],
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-green-500/10",
    },
    {
      icon: Ruler,
      title: "CNC Files (NC1, DSTV)",
      description:
        "Machine-readable files for automated fabrication equipment, ensuring precision manufacturing.",
      features: [
        "Cutting patterns",
        "Hole locations",
        "Beveling details",
        "Machine-specific formats",
      ],
      bgColor: "bg-orange-500/5 hover:bg-orange-500/10",
      borderColor: "border-orange-500/20",
      iconBg: "bg-orange-500/10",
    },
  ];

  const specialties = [
    {
      title: "Joist & Deck Detailing",
      description:
        "Specialized detailing for open web steel joists, joist girders, and metal decking systems with precise specifications.",
      icon: Layers,
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Miscellaneous Steel",
      description:
        "Comprehensive detailing for stairs, ladders, handrails, platforms, and other secondary steel elements.",
      icon: Building,
      bgColor: "bg-green-500/10",
    },
    {
      title: "Connection Modeling",
      description:
        "Expert modeling of structural connections, ensuring compatibility, strength, and constructability.",
      icon: LinkIcon,
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Weld Symbols & Bolt Specs",
      description:
        "Accurate representation of weld symbols and bolt specifications according to project standards.",
      icon: Wrench,
      bgColor: "bg-amber-500/10",
    },
  ];

  const benefits = [
    {
      title: "Minimized RFI Delays",
      description:
        "Our detailed documentation reduces the need for Requests for Information, keeping your project on schedule.",
    },
    {
      title: "Reduced Rework at Site",
      description:
        "Precision detailing ensures components fit correctly the first time, eliminating costly field modifications.",
    },
    {
      title: "Fabrication Readiness",
      description:
        "Complete, production-ready documentation allows fabrication to begin immediately upon approval.",
    },
    {
      title: "Optimized Material Usage",
      description:
        "Strategic detailing helps reduce waste and optimize material usage, lowering overall project costs.",
    },
    {
      title: "Enhanced Project Coordination",
      description:
        "Our detailed models facilitate better coordination between disciplines, preventing costly clashes.",
    },
    {
      title: "Accelerated Construction Timeline",
      description:
        "Accurate documentation streamlines fabrication and erection, reducing overall project duration.",
    },
  ];

  return (
    <>
      <Navbar />
      {/* Meta information */}
      <head>
        <title>Structural Steel Detailing Services | StruoIndia</title>
        <meta
          name="description"
          content="Accurate and timely structural steel detailing with Tekla and SDS/2. Includes shop drawings, ABMs, and erection plans."
        />
      </head>

      <section
        id="structural-steel-detailing"
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
                  Structural Steel Detailing
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6 gsap-reveal">
                Building With <span className="text-struo-red">Accuracy</span>,
                Delivered with <span className="text-struo-red">Speed</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 gsap-reveal max-w-3xl mx-auto">
                We offer industry-grade steel detailing services using Tekla
                Structures and SDS/2, tailored for fabricators, EPC contractors,
                and builders worldwide.
              </p>

              <div className="flex flex-wrap justify-center gap-4 gsap-reveal">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-8 py-6 text-lg"
                  >
                    Request a Quote
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-8 py-6 text-lg"
                  >
                    View Portfolio
                  </Button>
                </MagneticButton>
              </div>
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

          {/* Main Image */}
          <div className="mb-32 rounded-2xl overflow-hidden h-96 relative">
            <Image
              src="/steel-detailing-hero.jpg"
              alt="Structural Steel Detailing"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Precision Engineering for Complex Projects
                </h3>
                <p className="text-white/80 text-base max-w-2xl">
                  Our detailed models and drawings enable seamless fabrication
                  and erection of structural steel components
                </p>
              </div>
            </div>
          </div>

          {/* Detailing Services Grid */}
          <div ref={servicesRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Detailing Scope
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground service-item">
                Comprehensive Detailing Deliverables
              </h2>
              <p className="mt-4 text-lg text-muted-foreground service-item max-w-2xl mx-auto">
                Our steel detailing services encompass all documentation needed
                for successful fabrication and erection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailingServices.map((service, index) => (
                <motion.div
                  key={index}
                  className={`service-item ${service.bgColor} p-8 rounded-2xl shadow-md border ${service.borderColor} transition-all duration-300 h-full flex flex-col`}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}
                  >
                    <service.icon className="h-7 w-7 text-foreground" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
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

          {/* Specialties Section */}
          <div className="mb-32 bg-secondary/10 py-16 px-8 rounded-3xl border border-border/20">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Expertise
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                We Are Specialists In
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our team excels in specialized detailing areas that require
                in-depth knowledge and experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="flex p-6 rounded-2xl bg-background border border-border/20"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${specialty.bgColor} flex items-center justify-center mr-6 flex-shrink-0`}
                  >
                    <specialty.icon className="h-7 w-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {specialty.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {specialty.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Software & Tools */}
          <div className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Industry-Leading Software
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We leverage the most powerful structural detailing tools to
                deliver precise and efficient solutions.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-xl flex items-center justify-center mb-3">
                  <Image
                    src="/tekla-logo.svg"
                    alt="Tekla Structures"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-sm font-medium">Tekla Structures</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-xl flex items-center justify-center mb-3">
                  <Image
                    src="/sds2-logo.svg"
                    alt="SDS/2"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-sm font-medium">SDS/2</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-xl flex items-center justify-center mb-3">
                  <Image
                    src="/autocad-logo.svg"
                    alt="AutoCAD"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-sm font-medium">AutoCAD</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-xl flex items-center justify-center mb-3">
                  <Image
                    src="/revit-logo.svg"
                    alt="Revit"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-sm font-medium">Revit</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div ref={benefitsRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Key Benefits
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground benefit-item">
                Why Choose Our Detailing Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground benefit-item max-w-2xl mx-auto">
                Our detailing minimizes RFI delays, rework at site, and ensures
                fabrication readiness on day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="benefit-item bg-secondary/10 hover:bg-secondary/20 p-8 rounded-2xl border border-border/20 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-struo-red mr-3" />
                    <h3 className="text-xl font-bold text-foreground">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Gallery */}
          <div className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl overflow-hidden h-64 relative">
              <Image
                src="/steel-detailing-1.jpg"
                alt="Steel Detailing Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                <div className="p-4">
                  <p className="text-white font-medium">3D Modeling</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-64 relative">
              <Image
                src="/steel-detailing-2.jpg"
                alt="Shop Drawing Creation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                <div className="p-4">
                  <p className="text-white font-medium">
                    Shop Drawing Creation
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-64 relative">
              <Image
                src="/steel-detailing-3.jpg"
                alt="Fabrication Output"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                <div className="p-4">
                  <p className="text-white font-medium">Fabrication Output</p>
                </div>
              </div>
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
                Ready to Elevate Your Steel Project?
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let our expert detailing team help you achieve precision,
                efficiency, and cost-effectiveness in your next structural steel
                project.
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
                    View Sample Projects
                  </Button>
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
