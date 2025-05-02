// app/services/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
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
  BarChart3,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Dynamically import heavy libraries
import dynamic from "next/dynamic";

// Lazy load non-critical components
const MagneticButton = dynamic(() => import("@/components/magnetic-button"), {
  ssr: false,
  loading: () => <div className="magnetic-btn-placeholder" />,
});

export default function Services() {
  // Use native Intersection Observer instead of GSAP
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [heroInView, setHeroInView] = useState(false);
  const [servicesInView, setServicesInView] = useState(false);
  const [processInView, setProcessInView] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.target === heroRef.current && entry.isIntersecting) {
          setHeroInView(true);
          observer.unobserve(entry.target);
        } else if (
          entry.target === servicesRef.current &&
          entry.isIntersecting
        ) {
          setServicesInView(true);
          observer.unobserve(entry.target);
        } else if (
          entry.target === processRef.current &&
          entry.isIntersecting
        ) {
          setProcessInView(true);
          observer.unobserve(entry.target);
        } else if (entry.target === ctaRef.current && entry.isIntersecting) {
          setCtaInView(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (heroRef.current) observer.observe(heroRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (processRef.current) observer.observe(processRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (processRef.current) observer.unobserve(processRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  // Implement image loading strategy
  const [imagesLoaded, setImagesLoaded] = useState(false);
  useEffect(() => {
    // Set images as loaded after a short delay to prevent layout shift
    const timer = setTimeout(() => setImagesLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Wrench,
      title: "Structural Steel Detailing",
      description:
        "End-to-end detailing including anchor bolt plans, GA drawings, shop drawings, and erection plans.",
      features: [
        "Anchor bolt plans",
        "General arrangement drawings",
        "Fabrication shop drawings",
        "Erection plans",
      ],
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      borderColor: "border-struo-red/20",
      iconBg: "bg-struo-red/10",
    },
    {
      icon: Building,
      title: "Pre-Engineered Building Detailing",
      description:
        "Accurate PEB detailing for primary and secondary framing, roof/wall panels, and accessories.",
      features: [
        "Primary & secondary framing",
        "Roof & wall panels",
        "Trims & accessories",
        "Foundation layouts",
      ],
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
    },
    {
      icon: LinkIcon,
      title: "Connection Design",
      description:
        "Expert connection design as per AISC, CSA, and IS standards with focus on stability.",
      features: [
        "AISC, CSA & IS compliance",
        "Structural analysis",
        "Connection optimization",
        "Constructability review",
      ],
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/10",
    },
    {
      icon: BarChart3,
      title: "Material Take-off (ABM)",
      description:
        "Quantity estimations and Advance Bill of Materials to streamline procurement.",
      features: [
        "Detailed material lists",
        "Cost optimization",
        "Procurement planning",
        "Waste reduction",
      ],
      bgColor: "bg-teal-500/5 hover:bg-teal-500/10",
      borderColor: "border-teal-500/20",
      iconBg: "bg-teal-500/10",
    },
    {
      icon: Layers,
      title: "BIM Coordination",
      description:
        "Clash detection, coordination with architects and MEP, and LOD-400 compliance.",
      features: [
        "Clash detection",
        "Multi-discipline coordination",
        "LOD-400 compliance",
        "Visualization support",
      ],
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-green-500/10",
    },
    {
      icon: FileText,
      title: "Fabrication Shop Drawings",
      description:
        "Fabricator-friendly, CNC-compatible shop drawings for error-free production.",
      features: [
        "CNC-compatible outputs",
        "Production-ready details",
        "Fabrication optimization",
        "Assembly instructions",
      ],
      bgColor: "bg-orange-500/5 hover:bg-orange-500/10",
      borderColor: "border-orange-500/20",
      iconBg: "bg-orange-500/10",
    },
    {
      icon: Lightbulb,
      title: "Value Engineering",
      description:
        "Reduce costs without compromising safety with our smart engineering solutions.",
      features: [
        "Cost reduction strategies",
        "Material optimization",
        "Design alternatives",
        "Performance analysis",
      ],
      bgColor: "bg-amber-500/5 hover:bg-amber-500/10",
      borderColor: "border-amber-500/20",
      iconBg: "bg-amber-500/10",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Project Analysis",
      description:
        "We analyze your project requirements, specifications, and constraints.",
    },
    {
      number: "02",
      title: "Concept Development",
      description:
        "Our team creates initial concepts based on project requirements.",
    },
    {
      number: "03",
      title: "Detailed Engineering",
      description: "We develop comprehensive detailed drawings with precision.",
    },
    {
      number: "04",
      title: "Quality Assurance",
      description: "Multi-level quality checks ensure error-free deliverables.",
    },
    {
      number: "05",
      title: "Client Review",
      description: "We collaborate with you to review and implement changes.",
    },
    {
      number: "06",
      title: "Final Delivery",
      description:
        "Timely delivery with ongoing support throughout your project.",
    },
  ];

  const stats = [
    { value: "2000+", label: "Projects" },
    { value: "100+", label: "Clients" },
    { value: "20+", label: "Years" },
    { value: "100%", label: "Satisfaction" },
  ];

  // Lazy load software icons
  const softwareTools = [
    { name: "Tekla Structures", src: "/tekla-logo.svg" },
    { name: "SDS/2", src: "/sds2-logo.svg" },
    { name: "AutoCAD", src: "/autocad-logo.svg" },
    { name: "Revit", src: "/revit-logo.svg" },
    { name: "STAAD.Pro", src: "/staad-logo.svg" },
  ];

  return (
    <>
      <Navbar />
      <section
        id="services"
        className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-background text-foreground"
      >
        {/* Simplified Background - only render on desktop */}
        {typeof window !== "undefined" && window.innerWidth > 768 && (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-70" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl opacity-70" />
          </div>
        )}

        <div className="container relative z-10 px-4 md:px-6">
          {/* Hero Section - with animations only when in view */}
          <div ref={heroRef} className="relative mb-20 md:mb-28">
            <div className="max-w-4xl mx-auto text-center">
              <div
                className={`inline-flex items-center space-x-2 mb-4 transition-opacity duration-700 ${
                  heroInView ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Services
                </span>
                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
              </div>

              <h1
                className={`text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-4 transition-all duration-700 ${
                  heroInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Our Expertise,{" "}
                <span className="text-struo-red">Your Competitive Edge</span>
              </h1>

              <p
                className={`text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
                  heroInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                StruoIndia offers a complete suite of structural engineering
                services for efficient, accurate, and cost-effective projects.
              </p>

              <div
                className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-200 ${
                  heroInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Button
                  size="lg"
                  className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6 py-5"
                >
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-6 py-5"
                >
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section - Simplified */}
          <div className="relative mb-20 md:mb-28 py-8 px-4 md:px-6 bg-secondary/20 rounded-2xl border border-border/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid - with lazy loading */}
          <div ref={servicesRef} className="mb-20 md:mb-28">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center space-x-2 mb-3">
                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Core Services
                </span>
                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
              </div>
              <h2
                className={`text-2xl md:text-3xl font-bold text-foreground transition-all duration-500 ${
                  servicesInView ? "opacity-100" : "opacity-0"
                }`}
              >
                Comprehensive Engineering Solutions
              </h2>
              <p
                className={`mt-3 text-base text-muted-foreground max-w-2xl mx-auto transition-all duration-500 delay-100 ${
                  servicesInView ? "opacity-100" : "opacity-0"
                }`}
              >
                Our specialized services meet the unique needs of each project
                with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`${
                    service.bgColor
                  } p-6 rounded-xl shadow-sm border ${
                    service.borderColor
                  } transition-all duration-300 h-full flex flex-col transform ${
                    servicesInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-4`}
                  >
                    <service.icon className="h-6 w-6 text-foreground" />
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <ul className="space-y-1.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-struo-red mr-1.5 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section - simplified animation */}
          <div ref={processRef} className="mb-20 md:mb-28">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center space-x-2 mb-3">
                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Process
                </span>
                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
              </div>
              <h2
                className={`text-2xl md:text-3xl font-bold text-foreground transition-all duration-500 ${
                  processInView ? "opacity-100" : "opacity-0"
                }`}
              >
                How We Deliver Excellence
              </h2>
              <p
                className={`mt-3 text-base text-muted-foreground max-w-2xl mx-auto transition-all duration-500 delay-100 ${
                  processInView ? "opacity-100" : "opacity-0"
                }`}
              >
                Our structured approach ensures quality at every stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`bg-secondary/10 hover:bg-secondary/15 p-6 rounded-xl border border-border/20 transition-all duration-300 transform ${
                    processInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl font-bold text-struo-red/20">
                      {step.number}
                    </span>
                    <div className="h-px flex-grow bg-border/30 mx-3"></div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Showcase - Optimized */}
          {imagesLoaded && (
            <div className="mb-20 md:mb-28 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden h-64 relative">
                <Image
                  src="/services-1.jpg"
                  alt="Structural Steel Project"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      Industrial Steel Structures
                    </h3>
                    <p className="text-white/80 text-xs">
                      Precision engineering for complex industrial facilities
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden h-64 relative">
                <Image
                  src="/services-2.jpg"
                  alt="3D BIM Model"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      Advanced BIM Modeling
                    </h3>
                    <p className="text-white/80 text-xs">
                      Detailed 3D coordination for seamless project execution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Software & Tools - Lazy loaded */}
          <div className="mb-20 md:mb-28">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Advanced Tools & Technologies
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                We leverage industry-leading software to deliver precise
                solutions.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              {softwareTools.map((tool, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-lg flex items-center justify-center mb-2">
                    <Image
                      src={tool.src}
                      alt={tool.name}
                      width={36}
                      height={36}
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs font-medium">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section - Simplified */}
          <div
            ref={ctaRef}
            className={`bg-gradient-to-r from-struo-red/10 to-primary/10 rounded-xl p-8 border border-border/20 relative overflow-hidden transition-all duration-700 ${
              ctaInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Next Project?
              </h2>

              <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our team is ready to bring your structural steel vision to life.
                Contact us today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-6"
                >
                  View Our Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
