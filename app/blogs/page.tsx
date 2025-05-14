"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

export default function Blogs() {
    const blogsRef = useRef<HTMLDivElement>(null);
    const [blogsInView, setBlogsInView] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Fetch blogs from Supabase
    useEffect(() => {
        async function fetchBlogs() {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                console.error("Error fetching blogs:", error);
            } else {
                setBlogs(data || []);
            }
        }
        fetchBlogs();
    }, []);

    // Intersection Observer for animations
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
                if (entry.target === blogsRef.current && entry.isIntersecting) {
                    setBlogsInView(true);
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);
        if (blogsRef.current) observer.observe(blogsRef.current);
        return () => {
            if (blogsRef.current) observer.unobserve(blogsRef.current);
        };
    }, []);

    // Image loading strategy
    useEffect(() => {
        const timer = setTimeout(() => setImagesLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Navbar />
            <section
                id="blogs"
                className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-background text-foreground"
            >
                {/* Background gradient */}
                {typeof window !== "undefined" && window.innerWidth > 768 && (
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-70" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl opacity-70" />
                    </div>
                )}

                <div className="container relative z-10 px-4 md:px-6">
                    {/* Header Section */}
                    <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
                        <div className="inline-flex items-center space-x-2 mb-4">
                            <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                Our Blog
                            </span>
                            <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                        </div>
                        <h1
                            className={`text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-4 transition-all duration-700 ${blogsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                        >
                            Insights & Updates from{" "}
                            <span className="text-struo-red">StruoIndia</span>
                        </h1>
                        <p
                            className={`text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto transition-all duration-700 delay-100 ${blogsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                        >
                            Stay informed with the latest trends, tips, and news in structural
                            engineering.
                        </p>
                    </div>

                    {/* Blogs Grid */}
                    <div ref={blogsRef} className="mb-20 md:mb-28">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog, index) => (
                                <div
                                    key={blog.id}
                                    className={`bg-secondary/5 hover:bg-secondary/10 p-6 rounded-xl shadow-sm border border-border/20 transition-all duration-300 h-full flex flex-col transform ${blogsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                        }`}
                                    style={{ transitionDelay: `${100 + index * 50}ms` }}
                                >
                                    {imagesLoaded && blog.image_url && (
                                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                            <Image
                                                src={blog.image_url}
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover"
                                                loading="lazy"
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold mb-2 text-foreground">
                                        {blog.title}
                                    </h3>
                        
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <Button
                                            variant="link"
                                            className="p-0 text-struo-red hover:text-struo-red/80"
                                        >
                                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}