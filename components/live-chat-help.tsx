"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquareText, X, Send, ChevronDown, ChevronUp, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  sender: "user" | "agent"
  text: string
  timestamp: Date
}

export function LiveChatHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "agent",
      text: "👋 Hi there! How can I help you with cybersecurity incident response today?",
      timestamp: new Date(),
    },
  ])
  const { toast } = useToast()

  // Auto-open chat after 10 seconds for better visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true)
        toast({
          title: "Security Analyst Available",
          description: "Our security analyst is online and ready to assist you.",
        })
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [isOpen, toast])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const sendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: message,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setMessage("")

    // Simulate agent response after a delay
    setTimeout(() => {
      const responses = [
        "I'll look into that for you right away.",
        "That's a great question about incident response. Let me provide some information.",
        "Have you checked our playbooks section? It contains detailed steps for handling this type of incident.",
        "I recommend reviewing the NIST framework mapping for this scenario.",
        "Would you like me to connect you with one of our security analysts for more detailed assistance?",
      ]

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])

      toast({
        title: "New message",
        description: "You have a new response from the security analyst",
      })
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 left-4 rounded-full h-14 w-14 p-0 bg-primary shadow-lg hover:bg-primary/90 z-50 animate-pulse"
        title="Open live chat"
      >
        <MessageSquareText className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-4 left-4 z-50 w-80"
      >
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="pb-2 pt-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center">
                <MessageSquareText className="h-4 w-4 mr-2" />
                Security Analyst Chat
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:text-primary-foreground/80"
                  onClick={toggleMinimize}
                >
                  {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:text-primary-foreground/80"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-3">
                  <div className="bg-muted/30 rounded-lg p-3 h-64 overflow-y-auto flex flex-col gap-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-2 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                          {msg.sender === "agent" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/security-analyst.png" alt="Security Analyst" />
                              <AvatarFallback className="bg-primary text-primary-foreground">SA</AvatarFallback>
                            </Avatar>
                          )}
                          {msg.sender === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-muted">
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg p-2 text-sm ${
                              msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {msg.text}
                            <div className="text-xs opacity-70 mt-1">
                              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-3 pt-0">
                  <div className="flex w-full gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
