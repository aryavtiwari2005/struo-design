"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./magnetic-button";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

// Social media icons mapping
const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headingRef.current) {
      gsap.from(headingRef.current.querySelectorAll(".gsap-reveal"), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });
    }

    if (formRef.current) {
      gsap.from(formRef.current.querySelectorAll(".form-element"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: "123 Business Park, New Delhi, India",
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: "+91 98765 43210",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "info@struoindia.com",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-primary mb-4 gsap-reveal">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">
            Get in Touch with Our Team
          </h2>
          <p className="text-muted-foreground gsap-reveal">
            Have questions or need a consultation? Reach out to us and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-element">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="form-element">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="form-element">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="form-element">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project or inquiry"
                  rows={5}
                  required
                  className="rounded-lg resize-none"
                />
              </div>

              <div className="form-element">
                <MagneticButton>
                  <Button
                    type="submit"
                    className="w-full rounded-lg group bg-struo-red hover:bg-struo-red/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </MagneticButton>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-sm mt-2"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.p>
                )}
              </div>
            </form>
          </div>

          <div className="order-1 lg:order-2">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-muted-foreground">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "linkedin", "instagram"].map(
                    (social) => {
                      const IconComponent =
                        socialIcons[social as keyof typeof socialIcons];

                      return (
                        <MagneticButton key={social} strength={50}>
                          <a
                            href={`#${social}`}
                            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            <span className="sr-only">{social}</span>
                            <IconComponent className="h-5 w-5 text-primary" />
                          </a>
                        </MagneticButton>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h4 className="font-medium mb-4">Business Hours</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
