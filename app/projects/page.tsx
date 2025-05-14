"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, X } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load non-critical components
const MagneticButton = dynamic(() => import("@/components/magnetic-button"), {
    ssr: false,
    loading: () => <div className="magnetic-btn-placeholder" />,
});

export default function Projects() {
    // Intersection Observer for animations
    const heroRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    const [heroInView, setHeroInView] = useState(false);
    const [projectsInView, setProjectsInView] = useState(false);
    const [ctaInView, setCtaInView] = useState(false);

    // Modal state for image popup
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

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
            entries.forEach((entry) => {
                if (entry.target === heroRef.current && entry.isIntersecting) {
                    setHeroInView(true);
                    observer.unobserve(entry.target);
                } else if (entry.target === projectsRef.current && entry.isIntersecting) {
                    setProjectsInView(true);
                    observer.unobserve(entry.target);
                } else if (entry.target === ctaRef.current && entry.isIntersecting) {
                    setCtaInView(true);
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);

        if (heroRef.current) observer.observe(heroRef.current);
        if (projectsRef.current) observer.observe(projectsRef.current);
        if (ctaRef.current) observer.observe(ctaRef.current);

        return () => {
            if (heroRef.current) observer.unobserve(heroRef.current);
            if (projectsRef.current) observer.unobserve(projectsRef.current);
            if (ctaRef.current) observer.unobserve(ctaRef.current);
        };
    }, []);

    // Image loading strategy
    const [imagesLoaded, setImagesLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setImagesLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Handle modal close with Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isModalOpen) {
                setIsModalOpen(false);
                setSelectedImage(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    // Handle image click to open modal
    const openModal = (url: string, title: string) => {
        setSelectedImage({ url, title });
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // Projects data from StruoIndia
    const projects = [
        {
            title: "The Mall of San Juan",
            location: "Phase 3 & 4, San Juan, Puerto Rico",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/MALL_SAN_JUAN.png",
        },
        {
            title: "Queen Savoy Hotel",
            location: "Queens Blvd., New York, USA",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/QUEENS_SAVOY_HOTEL.png",
        },
        {
            title: "Hudson Park & Blvd",
            location: "New York, USA",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/HUDSON_PARK_CAFE-2.png",
        },
        {
            title: "Adrian College",
            location: "Adrian, MI, USA",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/ADRAIN_COLLEGE.png",
        },
        {
            title: "Medicine Hat Police Services",
            location: "Canada",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/MADICINE_HAT_POLICE_SERVICE.png",
        },
        {
            title: "Barzan Onshore",
            location: "Saudi Arabia",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/BARZAN_ONSHORE.png",
        },
        {
            title: "Fire & Rescue Simulating",
            location: "Canada",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/Fire_-Rescue_Simulating-2.png",
        },
        {
            title: "Abu Dhabi Oil Refining",
            location: "Abu Dhabi, UAE",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/ABU_DHABI_OIL.png",
        },
        {
            title: "De-Ethnizer Plant",
            location: "West Virginia, USA",
            image: "https://www.struoindia.com/wp-content/uploads/2024/04/DE-ETHANIZER_PLANT.png",
        },
    ];

    return (
        <>
            <Navbar />
            <section
                id="projects"
                className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-background text-foreground"
            >
                {/* Background gradient - desktop only */}
                {typeof window !== "undefined" && window.innerWidth > 768 && (
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-70" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl opacity-70" />
                    </div>
                )}

                <div className="container relative z-10 px-4 md:px-6">
                    {/* Hero Section */}
                    <div ref={heroRef} className="relative mb-20 md:mb-28">
                        <div className="max-w-4xl mx-auto text-center">
                            <div
                                className={`inline-flex items-center space-x-2 mb-4 transition-opacity duration-700 ${heroInView ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                    Our Projects
                                </span>
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                            </div>

                            <h1
                                className={`text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-4 transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                    }`}
                            >
                                Showcasing Our Expertise in{" "}
                                <span className="text-struo-red">Structural Engineering</span>
                            </h1>

                            <p
                                className={`text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                    }`}
                            >
                                Explore our portfolio of successful projects across various industries and locations worldwide.
                            </p>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div ref={projectsRef} className="mb-20 md:mb-28">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <div className="inline-flex items-center space-x-2 mb-3">
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                    Featured Projects
                                </span>
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                            </div>
                            <h2
                                className={`text-2xl md:text-3xl font-bold text-foreground transition-all duration-500 ${projectsInView ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                Our Work Around the World
                            </h2>
                            <p
                                className={`mt-3 text-base text-muted-foreground max-w-2xl mx-auto transition-all duration-500 delay-100 ${projectsInView ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                From commercial buildings to industrial facilities, our projects demonstrate our commitment to excellence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className={`bg-secondary/5 hover:bg-secondary/10 p-6 rounded-xl shadow-sm border border-border/20 transition-all duration-300 h-full flex flex-col transform ${projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                        }`}
                                    style={{ transitionDelay: `${100 + index * 50}ms` }}
                                >
                                    {imagesLoaded && (
                                        <div
                                            className="relative h-48 mb-4 rounded-lg overflow-hidden cursor-pointer"
                                            onClick={() => openModal(project.image, project.title)}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold mb-2 text-foreground">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                        <MapPin className="inline-block h-4 w-4 mr-1" />
                                        {project.location}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div
                        ref={ctaRef}
                        className={`bg-gradient-to-r from-struo-red/10 to-primary/10 rounded-xl p-8 border border-border/20 relative overflow-hidden transition-all duration-700 ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                Ready to Start Your Next Project?
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Contact us to discuss how we can bring your vision to life with our engineering expertise.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white px-6"
                                    >
                                        Get in Touch
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/services">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="rounded-full border-border/50 text-foreground hover:bg-secondary/50 px-6"
                                    >
                                        View Our Services
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Modal */}
                {isModalOpen && selectedImage && (
                    <div
                        ref={modalRef}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in"
                        onClick={closeModal}
                        role="dialog"
                        aria-labelledby="modal-title"
                        aria-modal="true"
                    >
                        <div
                            className="relative bg-white rounded-lg w-full max-w-[95vw] sm:max-w-3xl md:max-w-4xl max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-struo-red/90 hover:bg-struo-red text-white rounded-full p-1.5 sm:p-2 z-10"
                                aria-label="Close modal"
                            >
                                <X className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
                                <Image
                                    src={selectedImage.url}
                                    alt={selectedImage.title}
                                    fill
                                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 60vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="p-2 sm:p-4 bg-white text-center">
                                <h3 id="modal-title" className="text-base sm:text-lg font-bold text-foreground">
                                    {selectedImage.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
}