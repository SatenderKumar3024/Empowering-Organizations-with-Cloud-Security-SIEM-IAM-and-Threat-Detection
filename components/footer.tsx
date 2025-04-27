"use client"

import type React from "react"

import { Shield, Linkedin, Twitter, Calendar, LinkIcon, Github } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" onClick={(e) => handleLinkClick(e, "hero")} className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Satender Kumar</span>
            </a>
            <p className="text-muted-foreground max-w-md">
              Professional cybersecurity incident response playbooks and GRC mapping for security professionals. Based
              on industry standards and best practices.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://linkedin.com/in/satender-singh2430"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/SatendeK2430"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linktr.ee/satendersingh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linktree"
                className="hover:text-primary transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              <a
                href="https://calendly.com/satenderkumar-analyst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Calendly"
                className="hover:text-primary transition-colors"
              >
                <Calendar className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/SatenderKumar3024"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, "about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#playbooks"
                  onClick={(e) => handleLinkClick(e, "playbooks")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Playbooks
                </a>
              </li>
              <li>
                <a
                  href="#research"
                  onClick={(e) => handleLinkClick(e, "research")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  GRC Mapping
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "contact")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.nist.gov/cyberframework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  NIST Cybersecurity Framework
                </a>
              </li>
              <li>
                <a
                  href="https://www.iso.org/isoiec-27001-information-security.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ISO 27001
                </a>
              </li>
              <li>
                <a
                  href="https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  NIST 800-61
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Satender Kumar. All rights reserved. Secured with SSL encryption.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="border-t border-border/40 mt-6 pt-6 text-xs text-muted-foreground">
          <p>
            This site implements SSL encryption, Content Security Policy (CSP) headers, input sanitization, and
            reCAPTCHA for secure communication.
          </p>
        </div>
      </div>
    </footer>
  )
}
