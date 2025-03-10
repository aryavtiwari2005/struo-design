"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
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

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (footerRef.current) {
      gsap.from(footerRef.current.querySelectorAll(".footer-anim"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 70%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Projects", href: "#projects" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Steel Design", href: "#steel-design" },
        { name: "Connection Design", href: "#connection-design" },
        { name: "Material Take-off", href: "#material-takeoff" },
        { name: "Customized Reports", href: "#reports" },
        { name: "Consulting", href: "#consulting" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#blog" },
        { name: "Case Studies", href: "#case-studies" },
        { name: "Whitepapers", href: "#whitepapers" },
        { name: "FAQs", href: "#faqs" },
        { name: "Support", href: "#support" },
      ],
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-secondary/50 dark:bg-secondary/20 pt-16 pb-8 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 footer-anim">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="StruoIndia Logo"
                width={360}
                height={200}
                className="h-24 w-auto"
              />
            </Link>

            <p className="text-muted-foreground mb-6 max-w-md">
              StruoIndia is a leading provider of structural engineering
              consultancy services, specializing in Structure Steel
              Design/Detailing, Connection Design and Analysis, Material
              Take-off, and customized reports.
            </p>

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

          {footerLinks.map((column, index) => (
            <div key={index} className="footer-anim">
              <h4 className="font-bold text-lg mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-anim pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StruoIndia. All rights reserved.
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="#privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="#cookies"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <Link
                href="#sitemap"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>

            <div className="flex items-center flex-wrap justify-center">
              <span className="text-sm text-muted-foreground mr-2 mb-2 md:mb-0">
                Subscribe to our newsletter
              </span>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-l-lg rounded-r-none border-r-0 w-48 md:w-auto"
                />
                <Button className="rounded-l-none rounded-r-lg bg-struo-red hover:bg-struo-red/90 text-white">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
