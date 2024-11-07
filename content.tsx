import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import React, { useEffect } from "react"
import PetController from "./lib/PetController"

export const config: PlasmoCSConfig = {
  world: "MAIN",
  run_at: "document_idle"
}

// Modified getOverlayAnchor to handle null case
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  const anchor = document.querySelector("#header")
  if (!anchor) {
    throw new Error("Could not find #header element for overlay anchor")
  }
  return anchor
}

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (updatePosition) => {
  const interval = setInterval(() => {
    updatePosition()
  }, 5000)

  return () => {
    clearInterval(interval)
  }
}

export default function Main() {
  // Initialize PetController instance
  const petController = new PetController()

  useEffect(() => {
    petController.start() // Start the pet controller on mount
  }, [])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        width: "98vw",
        height: "98vh",
        marginRight: "2vw",
        marginBottom: "2vw",
        overflow: "hidden"
      }}>
      <div
        style={{
          backgroundColor: "#ccc",
          borderRadius: "5px",
          width: "256px",
          height: "256px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <p>Canvas Pet Goes Here!</p>
      </div>
    </div>
  )
}
