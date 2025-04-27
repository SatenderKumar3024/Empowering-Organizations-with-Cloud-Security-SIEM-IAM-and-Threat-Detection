"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Server, Users, Cloud } from "lucide-react"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-cyan-500" />,
      title: "DDoS Attack Response",
      description:
        "Comprehensive playbook for identifying, containing, and mitigating distributed denial of service attacks.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Insider Threat Management",
      description: "Step-by-step procedures for detecting and responding to malicious insider activities.",
    },
    {
      icon: <Cloud className="h-10 w-10 text-blue-500" />,
      title: "Cloud Breach Response",
      description: "Detailed response plan for unauthorized access and data breaches in cloud environments.",
    },
    {
      icon: <Server className="h-10 w-10 text-green-500" />,
      title: "GRC Integration",
      description: "Mapping incident response activities to governance, risk, and compliance frameworks.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About This Project</h2>
          <p className="text-lg text-muted-foreground">
            This interactive resource provides security professionals with detailed, actionable incident response
            playbooks based on industry standards like NIST 800-61 and ISO 27035. Each playbook is mapped to relevant
            GRC frameworks to ensure compliance while handling security incidents.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              variants={itemVariants}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
