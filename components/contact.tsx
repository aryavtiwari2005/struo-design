"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Check,
  Linkedin,
} from "lucide-react";
import MagneticButton from "./magnetic-button";

const socialIcons = {
  linkedin: Linkedin,
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
      terms_accepted: formData.get("terms") === "on",
    };

    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setFormSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: `Canada: 2704 Eagle Mountain Drive, Abbotsford, British Columbia - V3G0C4 
                India: A-45, Kanchan Kunj, Mandanpur Khadar Extn-2, New Delhi - 110076`,
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: "+1-236-380-5141, +91-8130238433",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "detailing@struoindia.com",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-10 md:py-10 overflow-hidden bg-background text-foreground"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-primary mb-4 text-foreground">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Get in Touch with Our Team
          </h2>
          <p className="text-muted-foreground">
            Have questions or need a consultation? Reach out to us and we'll get
            back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">Message Sent Successfully!</h3>
                <p className="text-muted-foreground max-w-md">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Full Name <span className="text-struo-red">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      className="rounded-lg bg-background text-foreground border-border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Email Address <span className="text-struo-red">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="rounded-lg bg-background text-foreground border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="rounded-lg bg-background text-foreground border-border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company Ltd."
                      className="rounded-lg bg-background text-foreground border-border"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Service Required <span className="text-struo-red">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-struo-red/50 transition text-foreground"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="steel-detailing">Structural Steel Detailing</option>
                    <option value="peb">Pre-Engineered Building Detailing</option>
                    <option value="connection-design">Connection Design</option>
                    <option value="material-takeoff">Material Take-off (ABM)</option>
                    <option value="bim">BIM Coordination</option>
                    <option value="shop-drawings">Fabrication Shop Drawings</option>
                    <option value="value-engineering">Value Engineering</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Message <span className="text-struo-red">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or inquiry"
                    rows={5}
                    required
                    className="rounded-lg bg-background text-foreground border-border resize-none"
                  />
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="mt-1 focus:ring-struo-red"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-xs text-muted-foreground"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-struo-red hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and acknowledge that my information will be processed in
                    accordance with the{" "}
                    <a href="#" className="text-struo-red hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <div>
                  <MagneticButton>
                    <Button
                      type="submit"
                      className="w-full rounded-lg group bg-struo-red hover:bg-struo-red/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <div className="glass rounded-2xl p-8 text-foreground">
              <h3 className="text-xl font-bold mb-6 text-foreground">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4 text-foreground">Follow Us</h4>
                <div className="flex space-x-4">
                  {["linkedin"].map((social) => {
                    const IconComponent =
                      socialIcons[social as keyof typeof socialIcons];
                    return (
                      <MagneticButton key={social} strength={50}>
                        <a
                          href="https://www.linkedin.com/company/106694149/admin/dashboard/"
                          target="_blank"
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                          <span className="sr-only">{social}</span>
                          <IconComponent className="h-5 w-5 text-primary" />
                        </a>
                      </MagneticButton>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}