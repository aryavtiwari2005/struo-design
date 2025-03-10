"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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
      })
    }
  }, [])

  const testimonials = [
    {
      name: "John Smith",
      position: "Project Manager, ABC Construction",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "StruoIndia delivered exceptional structural engineering solutions for our commercial tower project. Their attention to detail and innovative approach saved us time and resources while ensuring the highest quality standards.",
    },
    {
      name: "Sarah Johnson",
      position: "Director, XYZ Developers",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Working with StruoIndia has been a game-changer for our development projects. Their expertise in steel design and connection analysis has significantly improved our construction efficiency and structural integrity.",
    },
    {
      name: "Michael Chen",
      position: "Chief Architect, Design Innovations",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The team at StruoIndia consistently exceeds our expectations with their technical knowledge and collaborative approach. They've become an invaluable partner in our architectural design process.",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-secondary/50 dark:bg-secondary/20"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-primary mb-4 gsap-reveal">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">What Our Clients Say</h2>
          <p className="text-muted-foreground gsap-reveal">
            Hear from our satisfied clients about their experience working with StruoIndia.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 text-primary/10">
            <Quote size={80} />
          </div>

          <div className="relative overflow-hidden rounded-2xl glass p-8 md:p-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  position: activeIndex === index ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-lg md:text-xl italic mb-6">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prevTestimonial}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "w-6 bg-primary" : "bg-primary/30"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" className="rounded-full" onClick={nextTestimonial}>
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

