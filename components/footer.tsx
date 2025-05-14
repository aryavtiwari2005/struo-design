// components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import MagneticButton from "@/components/magnetic-button";

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "BIM Coordination", href: "/services/bim-coordination" },
        { name: "Connection Design", href: "/services/connection-design" },
        {
          name: "Structural Steel Detailing",
          href: "/services/structural-steel-detailing",
        },
      ],
    },
    // {
    //   title: "Resources",
    //   links: [
    //     { name: "Blog", href: "/blog" },
    //     { name: "Case Studies", href: "/case-studies" },
    //     { name: "Whitepapers", href: "/whitepapers" },
    //     { name: "FAQs", href: "/faqs" },
    //     { name: "Support", href: "/support" },
    //   ],
    // },
  ];

  return (
    <footer className="relative bg-secondary/50 pt-16 pb-8 overflow-hidden text-foreground">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
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
                        href={`https://${social}.com`}
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
            <div key={index}>
              <h4 className="font-bold text-lg mb-4 text-foreground">
                {column.title}
              </h4>
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
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StruoIndia. All rights reserved.
            </div>
            {/* <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <Link
                href="/sitemap"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div> */}
            {/* <div className="flex items-center flex-wrap justify-center">
              <span className="text-sm text-muted-foreground mr-2 mb-2 md:mb-0">
                Subscribe to our newsletter
              </span>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-l-lg rounded-r-none border-r-0 w-48 md:w-auto bg-background text-foreground border-border/50"
                />
                <Button className="rounded-l-none rounded-r-lg bg-struo-red hover:bg-struo-red/90 text-white">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
