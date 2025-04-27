"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { HeroAnimation } from "@/components/hero-animation"

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    if (scrollRef.current) {
      const nextSection = document.getElementById("about")
      nextSection?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={scrollRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #05080f, #080c1a)",
      }}
    >
      <div className="absolute inset-0 z-0">
        <HeroAnimation />
      </div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 30%, #a6c1ee 60%, #c2e9fb 100%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering Organizations with Cloud Security, SIEM, IAM, and Threat Detection
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 font-medium text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real-world Incident Response Playbooks, GRC Mapping, and Threat Intelligence Visualization
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="text-white font-medium"
              style={{
                background: "linear-gradient(to right, #4facfe 0%, #00f2fe 50%, #a6c1ee 100%)",
                boxShadow: "0 4px 15px rgba(79, 172, 254, 0.4)",
              }}
              onClick={() => {
                document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Explore Dashboard
            </Button>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        onClick={scrollToNext}
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
