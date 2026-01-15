import { confetti } from "@tsparticles/confetti"
import { triggerConfettiEffect } from "./confetti-effects"

interface ConfettiMessage {
  action: string
  preset?: {
    name: string
    config: any
  }
  config?: any
  presetName?: string
  url?: string
}

let confettiTriggered = false

// Check for pagepopper trigger in URL hash
function checkUrlHash() {
  if (confettiTriggered) return
  
  const hash = window.location.hash
  const match = hash.match(/pagepopper=([^&]+)/)
  if (match) {
    try {
      const decoded = decodeURIComponent(match[1])
      const data = JSON.parse(decoded)
      
      // Website now sends full config, so we can use it directly
      if (data.config) {
        confettiTriggered = true
        
        const trigger = () => {
          setTimeout(() => {
            // Use the config directly from data, preserving all properties
            // Spread the config to preserve all properties including any additional ones
            const config = {
              ...data.config,
              origin: data.config.origin || { x: 0.5, y: 0.5 }
            }
            
            // Pass the presetName to triggerConfetti
            const presetName = data.presetName || "Confetti"
            triggerConfetti(config, presetName)
            // Clean up hash to prevent retriggering
            const cleanHash = hash.replace(/[#&]?pagepopper=[^&]*/, '')
            if (cleanHash !== hash) {
              window.history.replaceState(null, '', window.location.pathname + window.location.search + (cleanHash || ''))
            }
          }, 500)
        }
        
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", trigger)
        } else {
          trigger()
        }
      }
    } catch (e) {
      console.error("Error parsing pagepopper data:", e)
    }
  }
}

// Check URL hash on load
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkUrlHash)
  } else {
    checkUrlHash()
  }
  
  // Also check on hash change
  window.addEventListener("hashchange", checkUrlHash)
}

// Listen for messages from chrome extension runtime
if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
  try {
    chrome.runtime.onMessage.addListener(
      (message: ConfettiMessage, sender, sendResponse) => {
        if (message.action === "showConfetti") {
          if (message.preset && !confettiTriggered) {
            confettiTriggered = true
            triggerConfetti(message.preset.config, message.preset.name)
            sendResponse({ success: true })
          } else if (message.config && !confettiTriggered) {
            // Support direct config messages
            confettiTriggered = true
            triggerConfetti(message.config, message.presetName || "Confetti")
            sendResponse({ success: true })
          }
        }
        return true
      }
    )
  } catch (e) {
    // Extension context might not be available
  }
}

// Function to trigger confetti
async function triggerConfetti(config: any, presetName?: string) {
  // Make effects responsive based on viewport size
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
  const scaleFactor = isMobile ? 0.7 : isTablet ? 0.85 : 1

  // Use shared effect handler
  await triggerConfettiEffect(config, presetName || "", scaleFactor)
}

export {}
