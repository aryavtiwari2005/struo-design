"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Building,
  Layers,
  FileText,
  Zap,
  PenTool,
  BarChart3,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/magnetic-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function BIMCoordination() {
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

  const bimServices = [
    {
      icon: Layers,
      title: "Structural BIM Modeling",
      description:
        "Comprehensive 3D structural modeling from LOD 300 to LOD 400 with precise component details and connection information.",
      features: [
        "LOD 300-400 compliance",
        "Structural framing systems",
        "Parametric connections",
        "Detailed component modeling",
      ],
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
    },
    {
      icon: PenTool,
      title: "Clash Detection & Resolution",
      description:
        "Identify and resolve design conflicts before construction begins to prevent costly on-site issues and delays.",
      features: [
        "Multi-discipline clash detection",
        "Conflict resolution reports",
        "Coordination solutions",
        "Issue tracking",
      ],
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      borderColor: "border-struo-red/20",
      iconBg: "bg-struo-red/10",
    },
    {
      icon: Building,
      title: "Integration with MEP & Architecture",
      description:
        "Seamless coordination between structural models and other building systems like MEP and architectural elements.",
      features: [
        "Cross-discipline model federation",
        "Interface management",
        "Construction sequence planning",
        "Design optimization",
      ],
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/10",
    },
    {
      icon: FileText,
      title: "IFC File Exports & Common Data Environment",
      description:
        "Industry-standard file formats and collaborative data environments to enhance project communication.",
      features: [
        "IFC export capabilities",
        "Model sharing",
        "CDE implementation support",
        "Collaboration workflows",
      ],
      bgColor: "bg-teal-500/5 hover:bg-teal-500/10",
      borderColor: "border-teal-500/20",
      iconBg: "bg-teal-500/10",
    },
    {
      icon: BarChart3,
      title: "Quantity Takeoffs & Cost Estimation",
      description:
        "Leverage BIM data for accurate material quantity calculations and detailed cost estimates.",
      features: [
        "Material quantity extraction",
        "Cost database integration",
        "Budget forecasting",
        "Value engineering support",
      ],
      bgColor: "bg-amber-500/5 hover:bg-amber-500/10",
      borderColor: "border-amber-500/20",
      iconBg: "bg-amber-500/10",
    },
    {
      icon: Zap,
      title: "4D Construction Sequencing",
      description:
        "Link 3D models with project schedules to visualize construction sequences and optimize project timelines.",
      features: [
        "Schedule integration",
        "Construction phase planning",
        "Installation sequence optimization",
        "Timeline visualization",
      ],
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-green-500/10",
    },
  ];

  const benefits = [
    {
      title: "Reduced Rework",
      description:
        "Identify and resolve conflicts before construction begins, eliminating costly on-site modifications.",
      icon: CheckCircle2,
      color: "text-struo-red",
    },
    {
      title: "Enhanced Collaboration",
      description:
        "Facilitate better communication between design teams, fabricators, and contractors.",
      icon: CheckCircle2,
      color: "text-struo-red",
    },
    {
      title: "Accelerated Schedules",
      description:
        "Streamline the construction process through better planning and coordination.",
      icon: CheckCircle2,
      color: "text-struo-red",
    },
    {
      title: "Improved Accuracy",
      description:
        "Create precise models that translate to exact fabrication and installation in the field.",
      icon: CheckCircle2,
      color: "text-struo-red",
    },
    {
      title: "Cost Optimization",
      description:
        "Identify cost-saving opportunities through virtual construction and material optimization.",
      icon: CheckCircle2,
      color: "text-struo-red",
    },
    {
      title: "Better Decision Making",
      description:
        "Visualize design options and construction sequences to make informed project decisions.",
      icon: CheckCircle2,
      color: "text-struo-red",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Model Creation",
      description:
        "Develop detailed 3D structural models based on design drawings and specifications.",
    },
    {
      number: "02",
      title: "Model Federation",
      description:
        "Combine structural models with architectural and MEP models for comprehensive project visualization.",
    },
    {
      number: "03",
      title: "Clash Detection",
      description:
        "Identify conflicts between different building systems and document issues for resolution.",
    },
    {
      number: "04",
      title: "Coordination Meetings",
      description:
        "Facilitate discussions between project stakeholders to resolve design conflicts.",
    },
    {
      number: "05",
      title: "Model Updates",
      description:
        "Implement design changes and verify that conflicts have been resolved successfully.",
    },
    {
      number: "06",
      title: "Final Deliverables",
      description:
        "Provide coordinated models, clash reports, and supporting documentation for project execution.",
    },
  ];

  const clients = [
    { label: "General Contractors" },
    { label: "Steel Fabricators" },
    { label: "EPCs and Civil Consultants" },
    { label: "Project Owners" },
    { label: "Architects" },
    { label: "Construction Managers" },
  ];

  return (
    <>
      <Navbar />
      <section
        id="bim-coordination"
        ref={sectionRef}
        className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-background text-foreground"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-3xl opacity-70" />
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
                  BIM Services
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6 gsap-reveal">
                Better Coordination.{" "}
                <span className="text-struo-red">Fewer Errors.</span> Faster
                Execution.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 gsap-reveal max-w-3xl mx-auto">
                StruoIndia supports BIM projects by offering integrated 3D
                modeling and coordination services across multiple disciplines.
                Resolve issues virtually to save time and money on-site.
              </p>

              <div className="flex flex-wrap justify-center gap-4 gsap-reveal">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-8 py-6 text-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-8 py-6 text-lg"
                  >
                    View Case Studies
                  </Button>
                </MagneticButton>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="hidden lg:block">
              <motion.div
                style={{ y: parallax, rotate: rotateLeft }}
                className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/5 rounded-3xl blur-xl"
              ></motion.div>
              <motion.div
                style={{ y: parallax, rotate: rotateRight }}
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-struo-red/5 rounded-3xl blur-xl"
              ></motion.div>
            </div>
          </div>

          {/* 3D Model Showcase */}
          <div className="relative mb-32 overflow-hidden rounded-3xl border border-border/20 h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-struo-red/10"></div>
            <Image
              src="/bim-model-showcase.jpg"
              alt="3D BIM Model Coordination"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent/40 flex items-end">
              <div className="p-8 max-w-3xl">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Visualize Before You Build
                </h2>
                <p className="text-white/90 text-lg">
                  Our BIM coordination services allow you to identify and
                  resolve issues in the virtual environment, preventing costly
                  rework and delays during construction.
                </p>
              </div>
            </div>
          </div>

          {/* BIM Services Grid */}
          <div ref={servicesRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our BIM Services
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground service-item">
                Comprehensive BIM Coordination
              </h2>
              <p className="mt-4 text-lg text-muted-foreground service-item max-w-2xl mx-auto">
                Our specialized services leverage the power of BIM to enhance
                collaboration, streamline construction, and deliver superior
                project outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bimServices.map((service, index) => (
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

          {/* Client Types */}
          <div className="mb-32 py-12 px-8 bg-secondary/20 rounded-3xl border border-border/20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Who Benefits from Our BIM Services
              </h3>
              <p className="text-muted-foreground mb-8">
                Our BIM coordination services are utilized by a diverse range of
                construction professionals seeking to improve project outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="bg-background/50 px-6 py-4 rounded-xl border border-border/20 text-center"
                >
                  <span className="font-medium">{client.label}</span>
                </div>
              ))}
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
                Why Choose BIM Coordination
              </h2>
              <p className="mt-4 text-lg text-muted-foreground benefit-item max-w-2xl mx-auto">
                The advantages of implementing BIM coordination in your projects
                go beyond just visualization, delivering tangible value
                throughout the project lifecycle.
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
                  <benefit.icon className={`h-8 w-8 ${benefit.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div ref={processRef} className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Process
                </span>
                <div className="h-1 w-8 bg-struo-red rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground process-item">
                How We Implement BIM Coordination
              </h2>
              <p className="mt-4 text-lg text-muted-foreground process-item max-w-2xl mx-auto">
                Our structured approach ensures a smooth BIM implementation that
                maximizes project benefits while minimizing disruption.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
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
                    <span className="text-4xl font-bold text-blue-500/20">
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

          {/* Tools & Software */}
          <div className="mb-32">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Industry-Leading BIM Tools
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We leverage the most powerful BIM platforms to deliver
                exceptional coordination results.
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
                    src="/tekla-bimsight-logo.svg"
                    alt="Tekla BIMsight"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-sm font-medium">Tekla BIMsight</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-xl flex items-center justify-center mb-3">
                  <Image
                    src="/navisworks-logo.svg"
                    alt="Navisworks"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-sm font-medium">Navisworks</p>
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

              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-xl flex items-center justify-center mb-3">
                  <Image
                    src="/solibri-logo.svg"
                    alt="Solibri"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-sm font-medium">Solibri</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            ref={ctaRef}
            className="bg-gradient-to-r from-blue-500/10 to-struo-red/10 rounded-3xl p-12 border border-border/20 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-struo-red/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Optimize Your Project with BIM?
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team of BIM specialists is ready to help you implement
                advanced coordination strategies that will save time, reduce
                costs, and improve your project outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-8"
                  >
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-8"
                  >
                    View BIM Case Studies
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
