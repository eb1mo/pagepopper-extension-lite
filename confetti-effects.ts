// Confetti effect handlers for extension
// This file should be kept in sync with website/app/confetti-effects.ts

import { confetti } from "@tsparticles/confetti"
import { getDefaultColors, getDefaultShapes } from "./confetti-utils"

export const triggerConfettiEffect = async (
  config: any,
  presetName: string,
  scaleFactor: number = 1
) => {
  const defaults = {
    colors: getDefaultColors(),
    shapes: getDefaultShapes()
  }

  const particleCount = Math.floor((config.particleCount || 100) * scaleFactor)
  const origin = config.origin || { x: 0.5, y: 0.5 }

  // For custom confetti, use all provided parameters directly
  if (presetName === "Custom" || presetName === "Custom Confetti") {
    // Ensure origin is properly extracted from config
    const customOrigin = config.origin || { x: 0.5, y: 0.5 }
    
    // Build confetti config with all custom parameters - use values directly from config
    const confettiConfig: any = {
      particleCount: particleCount,
      spread: config.spread !== undefined ? config.spread : 70,
      origin: {
        x: customOrigin.x !== undefined ? customOrigin.x : 0.5,
        y: customOrigin.y !== undefined ? customOrigin.y : 0.5
      },
      colors: (config.colors && Array.isArray(config.colors) && config.colors.length > 0) ? config.colors : defaults.colors,
      shapes: (config.shapes && Array.isArray(config.shapes) && config.shapes.length > 0) ? config.shapes : defaults.shapes,
      gravity: config.gravity !== undefined ? config.gravity : 1,
      decay: config.decay !== undefined ? config.decay : 0.94,
      ticks: config.ticks !== undefined ? config.ticks : 200
    }
    
    // Add optional parameters only if they are defined
    if (config.angle !== undefined && config.angle !== null) {
      confettiConfig.angle = config.angle
    }
    
    if (config.startVelocity !== undefined && config.startVelocity !== null) {
      confettiConfig.startVelocity = config.startVelocity * scaleFactor
    }
    
    await confetti(confettiConfig)
    return
  }

  // Main burst for presets
  await confetti({
    particleCount: particleCount,
    spread: config.spread || 70,
    origin: origin,
    colors: config.colors || defaults.colors,
    shapes: config.shapes || defaults.shapes,
    gravity: config.gravity || 1,
    decay: config.decay || 0.94,
    ticks: config.ticks || 200,
    angle: config.angle,
    startVelocity: config.startVelocity
      ? config.startVelocity * scaleFactor
      : undefined
  })

  // Special effect handlers
  if (presetName === "Fireworks") {
    setTimeout(async () => {
      await confetti({
        particleCount: Math.floor(50 * scaleFactor),
        angle: 120,
        spread: 55,
        origin: { x: 0.2, y: 0.6 },
        colors: defaults.colors,
        shapes: defaults.shapes,
        startVelocity: 45 * scaleFactor
      })
    }, 250)

    setTimeout(async () => {
      await confetti({
        particleCount: Math.floor(50 * scaleFactor),
        angle: 60,
        spread: 55,
        origin: { x: 0.8, y: 0.6 },
        colors: defaults.colors,
        shapes: defaults.shapes,
        startVelocity: 45 * scaleFactor
      })
    }, 400)
  } else if (presetName === "Rain") {
    for (let i = 0; i < 5; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: 30,
          spread: 30,
          origin: { x: 0.2 + i * 0.15, y: 0 },
          colors: defaults.colors,
          shapes: defaults.shapes,
          gravity: 2,
          decay: 0.9,
          ticks: 1000
        })
      }, i * 200)
    }
  } else if (presetName === "Explosion") {
    for (let i = 0; i < 3; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: 100,
          spread: 360,
          origin: origin,
          colors: defaults.colors,
          shapes: defaults.shapes,
          startVelocity: 30 - i * 10
        })
      }, i * 150)
    }
  } else if (presetName === "Stars Burst") {
    for (let i = 0; i < 3; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: 75,
          spread: 360,
          origin: origin,
          shapes: ["star"],
          startVelocity: 45 - i * 10,
          gravity: 0.8,
          colors: defaults.colors
        })
      }, i * 200)
    }
  } else if (presetName === "Hearts") {
    for (let i = 0; i < 4; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: 50,
          spread: 70 + i * 10,
          origin: { y: 0.6 },
          shapes: ["heart"],
          colors: ["#ff5e7e", "#ff36ff", "#ff0080"],
          startVelocity: 25 - i * 3
        })
      }, i * 150)
    }
  } else if (presetName === "Celebration") {
    const angles = [0, 90, 180, 270, 45, 135, 225, 315]
    angles.forEach((angle, i) => {
      setTimeout(async () => {
        await confetti({
          particleCount: 60,
          spread: 45,
          origin: origin,
          angle: angle,
          startVelocity: 25,
          gravity: 0.5,
          decay: 0.92,
          ticks: 300,
          colors: defaults.colors
        })
      }, i * 100)
    })
  } else if (presetName === "Streamers") {
    for (let i = 0; i < 4; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: 80,
          angle: 90,
          spread: 120,
          origin: { y: 0 },
          startVelocity: 40 - i * 5,
          gravity: 1.2,
          shapes: ["square"],
          colors: defaults.colors
        })
      }, i * 250)
    }
  } else if (presetName === "Circular Burst") {
    for (let i = 0; i < 4; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: 90,
          spread: 360,
          origin: origin,
          startVelocity: 35 - i * 5,
          gravity: 0,
          decay: 0.96,
          ticks: 500,
          shapes: ["circle"],
          colors: defaults.colors
        })
      }, i * 200)
    }
  } else if (presetName === "Color Wave") {
    for (let i = 0; i < 5; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: 80,
          spread: 70 + i * 5,
          origin: { y: 0.7 },
          startVelocity: 30,
          gravity: 1,
          decay: 0.95,
          colors: ["#ff0080", "#ff8c00", "#40e0d0", "#ff0080", "#ff8c00"]
        })
      }, i * 150)
    }
  } else if (presetName === "Realistic") {
    for (let i = 0; i < 3; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: Math.floor(50 * scaleFactor),
          angle: 60,
          spread: 55,
          origin: { x: 0.5, y: 0.5 },
          startVelocity: 45 * scaleFactor,
          colors: defaults.colors,
          shapes: defaults.shapes
        })
      }, i * 200)
    }
  } else if (presetName === "Double Fireworks") {
    setTimeout(async () => {
      await confetti({
        particleCount: 150,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.4 },
        startVelocity: 45,
        gravity: 1,
        colors: defaults.colors,
        shapes: defaults.shapes
      })
    }, 0)

    setTimeout(async () => {
      await confetti({
        particleCount: 150,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.4 },
        startVelocity: 45,
        gravity: 1,
        colors: defaults.colors,
        shapes: defaults.shapes
      })
    }, 300)
  } else if (presetName === "Side Blast Both") {
    // Left side - particles going top-right
    await confetti({
      particleCount: 150 * scaleFactor,
      angle: 45, // Top-right direction
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: defaults.colors,
      shapes: defaults.shapes,
      gravity: 1,
      decay: 0.94,
      startVelocity: 45 * scaleFactor
    })
    
    // Right side - particles going top-left
    await confetti({
      particleCount: 150 * scaleFactor,
      angle: 135, // Top-left direction
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors: defaults.colors,
      shapes: defaults.shapes,
      gravity: 1,
      decay: 0.94,
      startVelocity: 45 * scaleFactor
    })
  } else if (presetName === "Dual Emitter") {
    // Left emitter - particles going top-right
    for (let i = 0; i < 8; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: Math.floor(25 * scaleFactor),
          angle: 45, // Top-right direction
          spread: 25,
          origin: { x: 0, y: 0.3 }, // Left side
          startVelocity: 30 * scaleFactor,
          gravity: 1,
          decay: 0.95,
          colors: ["#ffffff", "#FF0000"],
          shapes: ["circle", "square"]
        })
      }, i * 150)
    }
    
    // Right emitter - particles going top-left
    for (let i = 0; i < 8; i++) {
      setTimeout(async () => {
        await confetti({
          particleCount: Math.floor(25 * scaleFactor),
          angle: 135, // Top-left direction
          spread: 25,
          origin: { x: 1, y: 0.3 }, // Right side
          startVelocity: 30 * scaleFactor,
          gravity: 1,
          decay: 0.95,
          colors: ["#ffffff", "#FF0000"],
          shapes: ["circle", "square"]
        })
      }, i * 150)
    }
  }
}
