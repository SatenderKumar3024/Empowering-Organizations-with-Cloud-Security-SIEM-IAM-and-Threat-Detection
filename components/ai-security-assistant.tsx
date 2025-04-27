"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Bot, X, ChevronDown, ChevronUp, Send, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define message types
interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

// Knowledge base for AI responses
const knowledgeBase = {
  ransomware:
    "Ransomware is a type of malicious software that encrypts a victim's files. The attackers then demand a ransom from the victim to restore access to the data upon payment. Users are shown instructions for how to pay a fee to get the decryption key. The costs can range from a few hundred dollars to thousands, payable to cybercriminals in Bitcoin.",
  phishing:
    "Phishing is a cybercrime in which a target is contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.",
  ddos: "A Distributed Denial of Service (DDoS) attack is a malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic.",
  "zero-day":
    "A zero-day vulnerability is a software security flaw that is unknown to those who should be interested in mitigating the vulnerability (including the vendor of the target software). Until the vulnerability is mitigated, hackers can exploit it to adversely affect computer programs, data, additional computers or a network.",
  malware:
    "Malware is any software intentionally designed to cause damage to a computer, server, client, or computer network. A wide variety of malware types exist, including computer viruses, worms, Trojan horses, ransomware, spyware, adware, and scareware.",
  "incident response":
    "Incident response is an organized approach to addressing and managing the aftermath of a security breach or cyberattack. The goal is to handle the situation in a way that limits damage and reduces recovery time and costs.",
  soc: "A Security Operations Center (SOC) is a facility that houses an information security team responsible for monitoring and analyzing an organization's security posture on an ongoing basis. The SOC team's goal is to detect, analyze, and respond to cybersecurity incidents using a combination of technology solutions and a strong set of processes.",
  siem: "Security Information and Event Management (SIEM) is a software solution that aggregates and analyzes activity from many different resources across your entire IT infrastructure. SIEM collects security data from network devices, servers, domain controllers, and more.",
  "threat intelligence":
    "Threat intelligence is evidence-based knowledge, including context, mechanisms, indicators, implications and action-oriented advice about an existing or emerging menace or hazard to assets. This intelligence can be used to inform decisions regarding the subject's response to that menace or hazard.",
}

export function AISecurityAssistant() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Security Assistant. How can I help you with cybersecurity today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-open the chat after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimized(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Generate AI response based on user input
  const generateResponse = (userInput: string) => {
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const lowercaseInput = userInput.toLowerCase()
      let response =
        "I don't have specific information about that. Could you ask about a cybersecurity topic like ransomware, phishing, DDoS attacks, or incident response?"

      // Check knowledge base for relevant information
      for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowercaseInput.includes(key)) {
          response = value
          break
        }
      }

      // Add response to messages
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: response,
          sender: "assistant",
          timestamp: new Date(),
        },
      ])

      setIsTyping(false)
    }, 1500)
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    generateResponse(input)
    setInput("")
  }

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-md w-full animate-in fade-in slide-in-from-right-5 duration-300">
      <Card className="bg-slate-950 text-white border-slate-800 shadow-xl overflow-hidden">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-400" />
            <h3 className="font-medium">AI Security Assistant</h3>
          </div>
          <div className="flex items-center gap-1">
            <Badge className="bg-emerald-600 hover:bg-emerald-700">Online</Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <ScrollArea className="h-80 p-3 pt-0">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === "assistant" ? (
                          <Bot className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <User className="h-4 w-4 text-blue-400" />
                        )}
                        <span className="text-xs text-slate-300">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-3 py-2 bg-slate-800 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs text-slate-300">
                          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                          •
                        </span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                          •
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-slate-800">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about cybersecurity..."
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                Try asking about: ransomware, phishing, DDoS, zero-day vulnerabilities
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
