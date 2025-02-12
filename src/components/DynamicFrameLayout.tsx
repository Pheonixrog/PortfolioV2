"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

const GRID_SIZE = 12
const CELL_SIZE = 60

interface MediaItem {
  id: number
  src: string
  type: "image" | "video"
  defaultPos: { x: number; y: number; w: number; h: number }
  hoverText: string
}

const initialMedia: MediaItem[] = [
  {
    id: 1,
    src: "image.png",
    type: "image",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    hoverText: "Powermate landing page"
  },
  {
    id: 2,
    src: "./assets/projects/supplychain/img1.png",
    type: "image",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    hoverText: "Tessaract (Blockchain-based Supply Chain Tracker)"
  },
  {
    id: 3,
    src: "assets/projects/coadingplatform/img1.png",
    type: "image",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    hoverText: "Coading Platform - Play with code or compete in challenges"
  },
  {
    id: 4,
    src: "assets/projects/darkpattern/img1.png",
    type: "image",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    hoverText: "Flow Spector (Dark Pattern Detection Chrome Extension & Educational Platform)"
  },
  {
    id: 5,
    src: "image1.png",
    type: "image",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    hoverText: "Taxeasy "
  },
  {
    id: 6,
    src: "image2.png",
    type: "image",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    hoverText: "Affordable Agency"
  }
]

export default function DynamicMediaGrid() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMedia)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [newMedia, setNewMedia] = useState<{ src: string; type: "image" | "video"; hoverText: string }>({
    src: "",
    type: "image",
    hoverText: "",
  })

  const getRowSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const addMediaItem = () => {
    if (!newMedia.src) return
    setMediaItems([...mediaItems, {
      id: mediaItems.length + 1,
      src: newMedia.src,
      type: newMedia.type,
      defaultPos: { x: (mediaItems.length % 3) * 4, y: Math.floor(mediaItems.length / 3) * 4, w: 4, h: 4 },
      hoverText: newMedia.hoverText,
    }])
    setNewMedia({ src: "", type: "image", hoverText: "" })
  }

  return (
    
    <div className="space-y-4 w-full h-full">
     

      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {mediaItems.map((item) => {
          const row = Math.floor(item.defaultPos.y / 4)
          const col = Math.floor(item.defaultPos.x / 4)
          return (
            <motion.div
              key={item.id}
              className="relative overflow-hidden"
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              {item.type === "image" ? (
                <img src={item.src} alt="Media" className="w-full h-full object-cover" />
              ) : (
                <video src={item.src} autoPlay loop muted className="w-full h-full object-cover" />
              )}
              {hovered?.row === row && hovered?.col === col && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl">
                  {item.hoverText}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
 
  )
}
