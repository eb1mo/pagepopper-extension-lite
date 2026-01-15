// Confetti utilities for extension
// Presets are now provided by the website, so we only need utility functions here
// This prevents duplication and ensures extension always uses latest presets from website

export interface ConfettiPreset {
  name: string
  config: any
}

// Utility functions for default values
export const getDefaultColors = () => [
  "#26ccff",
  "#a25afd",
  "#ff5e7e",
  "#88ff5a",
  "#fcff42",
  "#ffa62d",
  "#ff36ff"
]

export const getDefaultShapes = () => ["square", "circle"]
