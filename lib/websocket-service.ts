// This is a mock WebSocket service
// In a real application, you would connect to a real WebSocket server

type MessageHandler = (data: any) => void
type ConnectionHandler = () => void

class WebSocketService {
  private socket: WebSocket | null = null
  private messageHandlers: Map<string, MessageHandler[]> = new Map()
  private connectionHandlers: ConnectionHandler[] = []
  private reconnectInterval = 5000
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private url = ""

  connect(url: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return
    }

    this.url = url
    this.socket = new WebSocket(url)

    this.socket.onopen = () => {
      console.log("WebSocket connected")
      this.reconnectAttempts = 0
      this.connectionHandlers.forEach((handler) => handler())
    }

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        const { type, payload } = data

        if (this.messageHandlers.has(type)) {
          this.messageHandlers.get(type)?.forEach((handler) => handler(payload))
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    this.socket.onclose = () => {
      console.log("WebSocket disconnected")

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++
          this.connect(this.url)
        }, this.reconnectInterval)
      }
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  on(type: string, handler: MessageHandler) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, [])
    }

    this.messageHandlers.get(type)?.push(handler)
  }

  off(type: string, handler: MessageHandler) {
    if (this.messageHandlers.has(type)) {
      const handlers = this.messageHandlers.get(type) || []
      const index = handlers.indexOf(handler)

      if (index !== -1) {
        handlers.splice(index, 1)
      }
    }
  }

  onConnect(handler: ConnectionHandler) {
    this.connectionHandlers.push(handler)
  }

  send(type: string, payload: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }))
    } else {
      console.error("WebSocket not connected")
    }
  }

  // For demo purposes, simulate receiving messages
  simulateMessage(type: string, payload: any) {
    if (this.messageHandlers.has(type)) {
      this.messageHandlers.get(type)?.forEach((handler) => handler(payload))
    }
  }
}

// Singleton instance
export const webSocketService = new WebSocketService()

// For demo purposes, simulate WebSocket connection
export function initializeWebSocketDemo() {
  // Simulate connection
  setTimeout(() => {
    webSocketService.connectionHandlers.forEach((handler) => handler())

    // Simulate receiving threat updates every 10 seconds
    setInterval(() => {
      const threatUpdate = {
        timestamp: new Date().toISOString(),
        newThreats: Math.floor(Math.random() * 10) + 1,
        criticalAlerts: Math.floor(Math.random() * 3),
        threatData: Array.from({ length: 5 }, (_, i) => ({
          id: `threat-${Date.now()}-${i}`,
          type: ["Ransomware", "DDoS", "Phishing", "Malware", "Zero-day"][Math.floor(Math.random() * 5)],
          severity: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
          source: ["External", "Internal"][Math.floor(Math.random() * 2)],
          timestamp: new Date().toISOString(),
        })),
      }

      webSocketService.simulateMessage("threat-update", threatUpdate)
    }, 10000)
  }, 1000)
}
