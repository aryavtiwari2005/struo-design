"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import MagneticButton from "./magnetic-button";

export default function Projects() {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Queen Savoy Hotel",
      category: "Queens BLVD, NY",
      description:
        "Comprehensive steel structure design for a 40-story commercial tower.",
      image: "/QUEENS_SAVOY_HOTEL.png",
    },
    {
      title: "The Mall -of- San Juan",
      category: "Phase 3&4, San Juan, PR",
      description:
        "Detailed connection design and analysis for industrial expansion.",
      image: "/MALL_SAN_JUAN.png",
    },
    {
      title: "Hudson Park Cafe",
      category: "New York, USA",
      description:
        "Precise material quantification for a residential complex foundation.",
      image: "/HUDSON_PARK_CAFE-2.png",
    },
    {
      title: "Barzan Onshore Project",
      category: "Saudi Arabia",
      description:
        "Tailored engineering reports for a major bridge rehabilitation project.",
      image: "/BARZAN_ONSHORE.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-background text-foreground"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block text-sm font-medium text-primary mb-4 text-foreground">
            Our Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Industry-Leading Tools
          </h2>
          <p className="text-muted-foreground">
            We deploy the latest in 3D modeling and detailing software: Tekla
            Structures, SDS/2, AutoCAD.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={projectVariants}
              className="project-item relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block text-xs font-medium text-primary mb-2 bg-primary/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <MagneticButton>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <span className="text-primary">View Project</span>
                    <ExternalLink className="ml-2 h-3 w-3 text-primary" />
                  </Button>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
