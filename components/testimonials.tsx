"use client";

import { motion } from "framer-motion";
import { Globe, Clock, CheckCircle, Users } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Serving 100+ clients across 7 countries with world-class structural engineering solutions.",
    },
    {
      icon: Clock,
      title: "Industry Expertise",
      description:
        "20+ years driving innovation and excellence in structural engineering.",
    },
    {
      icon: CheckCircle,
      title: "Certified Quality",
      description:
        "Proven QA/QC processes ensuring compliance with international standards.",
    },
    {
      icon: Users,
      title: "Skilled Teams",
      description:
        "Dedicated teams trained on Tekla, SDS/2, and BIM for precise project delivery.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="achievements"
      className="relative py-20 md:py-32 bg-background text-foreground"
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
            Trusted worldwide for quality, expertise, and innovation in
            structural engineering.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-6 md:p-8 rounded-2xl bg-primary/5 border border-border/50 achievement-item"
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
        </motion.div>
      </div>
    </section>
  );
}
