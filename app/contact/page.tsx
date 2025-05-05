// app/contact/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

// Dynamically import heavy libraries
import dynamic from "next/dynamic";

export default function Contact() {
  // Use native Intersection Observer instead of GSAP
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [heroInView, setHeroInView] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [infoInView, setInfoInView] = useState(false);
  const [mapInView, setMapInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        } else if (entry.target === formRef.current && entry.isIntersecting) {
          setFormInView(true);
          observer.unobserve(entry.target);
        } else if (entry.target === infoRef.current && entry.isIntersecting) {
          setInfoInView(true);
          observer.unobserve(entry.target);
        } else if (entry.target === mapRef.current && entry.isIntersecting) {
          setMapInView(true);
          observer.unobserve(entry.target);
        } else if (entry.target === faqRef.current && entry.isIntersecting) {
          setFaqInView(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (heroRef.current) observer.observe(heroRef.current);
    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    if (mapRef.current) observer.observe(mapRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
      if (mapRef.current) observer.unobserve(mapRef.current);
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 12345 67890"],
      bgColor: "bg-struo-red/5 hover:bg-struo-red/10",
      borderColor: "border-struo-red/20",
      iconBg: "bg-struo-red/10",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@struoindia.com", "sales@struoindia.com"],
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Engineering Hub, Sector 5", "Delhi NCR, India - 201301"],
      bgColor: "bg-green-500/5 hover:bg-green-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-green-500/10",
    },
    {
      icon: Clock,
      title: "Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 2:00 PM",
      ],
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/10",
    },
  ];

  const faqs = [
    {
      question:
        "How quickly can you complete a structural steel detailing project?",
      answer:
        "Our turnaround time depends on project complexity and size. Typically, small to medium projects are completed within 2-4 weeks, while larger projects may take 6-8 weeks. We offer expedited services for urgent needs.",
    },
    {
      question: "What file formats do you work with?",
      answer:
        "We work with various formats including DWG, DXF, STEP, STP, IFC, and RVT. Our team can adapt to your preferred software ecosystem, whether it's AutoCAD, Tekla, Revit, or others.",
    },
    {
      question: "Do you provide international services?",
      answer:
        "Yes, we serve clients globally with projects completed across North America, Europe, Middle East, and Asia. Our team works in different time zones to ensure smooth communication.",
    },
    {
      question: "How do you ensure quality control?",
      answer:
        "We implement a multi-tier quality assurance process with dedicated QC engineers who verify all deliverables before client submission. Our process includes clash detection, code compliance checks, and constructability reviews.",
    },
  ];

  return (
    <>
      <Navbar />
      <section
        id="contact"
        className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-background text-foreground"
      >
        {/* Simplified Background - only render on desktop */}
        {typeof window !== "undefined" && window.innerWidth > 768 && (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-70" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl opacity-70" />
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
                  Get In Touch
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
                Let's Build Your{" "}
                <span className="text-struo-red">Next Project Together</span>
              </h1>

              <p
                className={`text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
                  heroInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Have questions or ready to start? Our team of structural
                engineering experts is here to help bring your vision to life.
              </p>
            </div>
          </div>

          {/* Contact Form and Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Contact Form */}
            <div
              ref={formRef}
              className={`lg:col-span-2 bg-secondary/5 p-8 rounded-xl shadow-sm border border-border/20 transition-all duration-500 ${
                formInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name <span className="text-struo-red">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-struo-red/50 transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address <span className="text-struo-red">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-struo-red/50 transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-struo-red/50 transition"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-struo-red/50 transition"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium">
                      Service Required <span className="text-struo-red">*</span>
                    </label>
                    <select
                      id="service"
                      required
                      defaultValue=""
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-struo-red/50 transition"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="steel-detailing">
                        Structural Steel Detailing
                      </option>
                      <option value="peb">
                        Pre-Engineered Building Detailing
                      </option>
                      <option value="connection-design">
                        Connection Design
                      </option>
                      <option value="material-takeoff">
                        Material Take-off (ABM)
                      </option>
                      <option value="bim">BIM Coordination</option>
                      <option value="shop-drawings">
                        Fabrication Shop Drawings
                      </option>
                      <option value="value-engineering">
                        Value Engineering
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Project Details <span className="text-struo-red">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-struo-red/50 transition"
                      placeholder="Please describe your project requirements..."
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="mt-1 focus:ring-struo-red"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-xs text-muted-foreground"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-struo-red hover:underline">
                        Terms & Conditions
                      </a>{" "}
                      and acknowledge that my information will be processed in
                      accordance with the{" "}
                      <a href="#" className="text-struo-red hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6 py-5"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div
              ref={infoRef}
              className={`space-y-4 transition-all duration-500 ${
                infoInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} p-4 rounded-xl border ${item.borderColor} transition-all duration-300`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center mr-4`}
                    >
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="pt-6">
                <h3 className="text-sm font-medium mb-3">Connect With Us</h3>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-struo-red/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-struo-red/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-struo-red/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-struo-red/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div
            ref={mapRef}
            className={`mb-20 transition-all duration-700 ${
              mapInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="rounded-xl overflow-hidden h-80 border border-border/20 relative">
              {/* Placeholder for an actual map integration */}
              <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-struo-red/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Map integration would go here. <br />
                    Visit us at: 123 Engineering Hub, Sector 5, Delhi NCR, India
                    - 201301
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div
            ref={faqRef}
            className={`mb-20 transition-all duration-700 ${
              faqInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
                  Quick answers to common inquiries about our services
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-secondary/5 border border-border/20 rounded-lg p-6"
                    style={{ transitionDelay: `${100 + index * 50}ms` }}
                  >
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground mb-4">
                  Still have questions? Our team is ready to help.
                </p>
                {/* <Button
                  variant="outline"
                  className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-6"
                >
                  View More FAQs
                </Button> */}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-struo-red/10 to-primary/10 rounded-xl p-8 border border-border/20 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Partner with a Trusted Structural Engineering Team?
              </h2>

              <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                From consultation to completion, we're committed to your
                project's success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Button
                  size="lg"
                  className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button> */}
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-6"
                  >
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
