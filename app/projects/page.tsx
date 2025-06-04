"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, X } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabase";

// Lazy load non-critical components
const MagneticButton = dynamic(() => import("@/components/magnetic-button"), {
    ssr: false,
    loading: () => <div className="magnetic-btn-placeholder" />,
});

// Define Project interface
interface Project {
    id: string;
    title: string;
    location: string;
    image: string;
}

export default function Projects() {
    // Modal state for image popup
    const modalRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

    // Projects state
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch projects from Supabase projects_struo table
    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from("projects_struo")
                    .select("id, title, location, image_url")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching projects:", error);
                    setError("Failed to load projects");
                    return;
                }

                console.log("Fetched projects:", data);

                // Map data to match the expected Project interface
                const mappedProjects: Project[] = data?.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    location: item.location,
                    image: item.image_url,
                })) || [];

                setProjects(mappedProjects);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    // Image loading state
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground">Loading projects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <section
                id="projects"
                className="pt-20 pb-24 md:pt-28 md:pb-32 bg-background text-foreground"
            >
                <div className="container px-4 md:px-6">
                    {/* Hero Section */}
                    <div className="mb-20 md:mb-28">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center space-x-2 mb-4">
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                    Our Projects
                                </span>
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-4">
                                Showcasing Our Expertise in{" "}
                                <span className="text-struo-red">Structural Engineering</span>
                            </h1>

                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
                                Explore our portfolio of successful projects across various industries and locations
                                worldwide.
                            </p>
                        </div>
                    </div>

                    {/* Projects Grid - Only render if projects exist */}
                    {projects.length > 0 && (
                        <div className="mb-20 md:mb-28">
                            <div className="max-w-3xl mx-auto text-center mb-12">
                                <div className="inline-flex items-center space-x-2 mb-3">
                                    <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                        Featured Projects
                                    </span>
                                    <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                    Our Work Around the World
                                </h2>
                                <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
                                    From commercial buildings to industrial facilities, our projects demonstrate our
                                    commitment to excellence.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-secondary/5 hover:bg-secondary/10 p-6 rounded-xl shadow-sm border border-border/20 h-full flex flex-col"
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
                                                    className="object-cover hover:scale-105"
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
                    )}

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-struo-red/10 to-primary/10 rounded-xl p-8 border border-border/20">
                        <div className="max-w-3xl mx-auto text-center">
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
                                        <ArrowRight className="ml-2 h-4 w-4" />
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
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4"
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