"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MagneticButton from "@/components/magnetic-button";
import { createPortal } from "react-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true when component mounts
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    // Control body overflow based on menu state
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      dropdownItems: [
        { name: "BIM Coordination", href: "/services/bim-coordination" },
        {
          name: "Structural Steel Detailing",
          href: "/services/structural-steel-detailing",
        },
        { name: "Connection Design", href: "/services/connection-design" },
      ],
    },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
  ];

  // Animation variants for the mobile menu
  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full h-16 md:h-24 z-50 transition-all duration-300 ${isScrolled ? "glass py-2" : "py-2 md:py-4"
          }`}
      >
        <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center relative z-50">
            <Image
              src="/logo.png"
              alt="StruoIndia Logo"
              width={360}
              height={80}
              className="h-10 md:h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative" ref={servicesRef}>
                  <MagneticButton>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  </MagneticButton>

                  <div
                    className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-background/95 backdrop-blur-md ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${isServicesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                  >
                    <div className="py-2">
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-150 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        View All Services
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                      {link.dropdownItems?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-150"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <MagneticButton key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </MagneticButton>
              )
            )}
            <MagneticButton>
              <Link href="/contact">
                <Button className="rounded-full text-white bg-struo-red hover:bg-struo-red/90">
                  Get in Touch
                </Button>
              </Link>
            </MagneticButton>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-foreground hover:text-primary relative z-50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Using Portal to avoid DOM hierarchy issues */}
      {isMounted &&
        isMenuOpen &&
        createPortal(
          <AnimatePresence mode="wait">
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg overflow-y-auto overflow-x-hidden"
            >
              <div className="flex flex-col min-h-screen pt-16 pb-6 px-2 sm:px-4">
                <nav className="flex flex-col space-y-4 items-center mt-8 w-full">
                  {navLinks.map((link) => (
                    <div key={link.name} className="w-full text-center">
                      {link.hasDropdown ? (
                        <div className="w-full flex flex-col items-center">
                          <button
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 inline-flex items-center py-1"
                          >
                            {link.name}
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""
                                }`}
                            />
                          </button>

                          <motion.div
                            animate={{
                              height: isServicesOpen ? "auto" : 0,
                              opacity: isServicesOpen ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full overflow-hidden"
                          >
                            <div className="flex flex-col items-center space-y-2 py-2">
                              <Link
                                href={link.href}
                                className="text-base font-medium text-foreground hover:text-primary transition-colors duration-150 inline-flex items-center justify-center w-full border-b border-gray-200 dark:border-gray-700 pb-2 mb-1"
                                onClick={closeMenu}
                              >
                                View All Services
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Link>
                              {link.dropdownItems?.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors duration-150 text-center w-full"
                                  onClick={closeMenu}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 inline-block py-1 text-center w-full"
                          onClick={closeMenu}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="mt-4 w-full flex justify-center">
                    <Link href="/contact">
                      <Button
                        className="rounded-full text-white bg-struo-red hover:bg-struo-red/90 px-6 py-4 text-base"
                        onClick={closeMenu}
                      >
                        Get in Touch
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
