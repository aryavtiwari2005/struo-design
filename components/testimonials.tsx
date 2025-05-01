// components/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Globe, Clock, CheckCircle, Users } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Serving 100+ clients across 7 countries, delivering world-class structural engineering solutions.",
    },
    {
      icon: Clock,
      title: "Industry Expertise",
      description:
        "20+ years of experience driving innovation and excellence in the structural engineering field.",
    },
    {
      icon: CheckCircle,
      title: "Certified Quality",
      description:
        "Proven QA/QC processes ensuring compliance with international building codes and standards.",
    },
    {
      icon: Users,
      title: "Skilled Teams",
      description:
        "Dedicated teams trained on Tekla, SDS/2, and BIM workflows for precise and efficient project delivery.",
    },
  ];

  return (
    <section
      id="achievements"
      className="relative py-20 md:py-32 overflow-hidden bg-secondary/50 dark:bg-secondary/20 text-foreground"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-primary mb-4 text-foreground">
            Our Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Global Clientele | Certified Excellence
          </h2>
          <p className="text-muted-foreground">
            Discover why StruoIndia is trusted worldwide for quality, expertise,
            and innovation in structural engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-2xl glass bg-primary/5 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
