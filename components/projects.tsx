"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./magnetic-button";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
  }, []);

  const projects = [
    {
      title: "Queen Savoy Hotel",
      category: "Queens BLVD, NY",
      description:
        "Comprehensive steel structure design for a 40-story commercial tower with complex architectural requirements.",
      image: "/QUEENS_SAVOY_HOTEL.png",
    },
    {
      title: "The Mall -of- San Juan",
      category: "Phase 3&4, San Juan, PR",
      description:
        "Detailed connection design and analysis for the expansion of a large-scale industrial manufacturing facility.",
      image: "/MALL_SAN_JUAN.png",
    },
    {
      title: "Hudson Park Cafe",
      category: "New York, USA",
      description:
        "Precise material quantification and estimation for a multi-building residential complex foundation system.",
      image: "/HUDSON_PARK_CAFE-2.png",
    },
    {
      title: "Barzan Onshore Project",
      category: "Saudi Arabia",
      description:
        "Tailored engineering reports and documentation for a major bridge rehabilitation project with strict compliance requirements.",
      image: "/BARZAN_ONSHORE.png",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div
          ref={headingRef}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4 gsap-reveal">
            Our Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">
            Featured Structural Engineering Projects
          </h2>
          <p className="text-muted-foreground gsap-reveal">
            Explore our portfolio of successful projects that showcase our
            expertise and commitment to excellence.
          </p>
        </div>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-item group relative overflow-hidden rounded-2xl shadow-lg"
              onMouseEnter={() => setActiveProject(index)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                <span className="inline-block text-xs font-medium text-primary mb-2 bg-primary/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.description}
                </p>
                <MagneticButton strength={40}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto group/btn"
                  >
                    <span className="text-primary group-hover/btn:underline">
                      View Project
                    </span>
                    <ExternalLink className="ml-2 h-3 w-3 text-primary" />
                  </Button>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <MagneticButton>
            <Button
              size="lg"
              className="rounded-full group bg-struo-red hover:bg-struo-red/90 text-white"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
