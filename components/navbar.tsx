"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const isMobile = useMobile()
  const scrollingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use useCallback to memoize the scroll handler to prevent recreating it on each render
  const handleScroll = useCallback(() => {
    // Set isScrolled based on scroll position
    setIsScrolled(window.scrollY > 10)

    // Prevent multiple section calculations during rapid scrolling
    if (scrollingRef.current) return
    scrollingRef.current = true

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a timeout to calculate active section after scrolling stops
    timeoutRef.current = setTimeout(() => {
      // Determine active section based on scroll position
      const sections = ["about", "dashboard", "research", "playbooks", "contact", "integration-tools"]
      const scrollPosition = window.scrollY + 100

      if (scrollPosition < document.getElementById("about")?.offsetTop || !document.getElementById("about")) {
        setActiveSection("hero")
        scrollingRef.current = false
        return
      }

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i])
        const nextSection = document.getElementById(sections[i + 1])

        if (section) {
          if (!nextSection || scrollPosition < nextSection.offsetTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }

      scrollingRef.current = false
    }, 100)
  }, [])

  useEffect(() => {
    // Add throttling to prevent too many updates
    let ticking = false

    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollListener)

    return () => {
      window.removeEventListener("scroll", scrollListener)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleScroll])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navLinks = [
    { href: "#about", label: "Overview", id: "about" },
    { href: "#dashboard", label: "Dashboard", id: "dashboard" },
    { href: "#research", label: "Research", id: "research" },
    { href: "#playbooks", label: "Security", id: "playbooks" },
    { href: "#integration-tools", label: "Integration", id: "integration-tools" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Satender Kumar</span>
        </Link>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <nav className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={`text-2xl font-medium transition-colors ${
                          activeSection === link.id ? "text-primary" : "hover:text-primary"
                        }`}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === link.id ? "text-primary" : "hover:text-primary"
                  }`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button
              variant="default"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Get In Touch
            </Button>
            <ModeToggle />
          </div>
        )}
      </div>
    </motion.header>
  )
}
