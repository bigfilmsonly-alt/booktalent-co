"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface VideoCardProps {
  title: string
  description: string
  thumbnailText: string
  duration: string
}

function VideoCard({ title, description, thumbnailText, duration }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-mjcc-charcoal border border-mjcc-dark overflow-hidden">
      {/* Thumbnail / Player area */}
      <div
        className="aspect-video relative cursor-pointer group"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <div className="absolute inset-0 bg-mjcc-black flex items-center justify-center">
            <p className="text-sm text-mjcc-muted">
              Video player placeholder. Replace with your embed URL.
            </p>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-mjcc-dark via-mjcc-charcoal to-mjcc-black flex items-center justify-center">
              <span className="font-serif text-4xl text-mjcc-cream/10">{thumbnailText}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-mjcc-gold/90 flex items-center justify-center group-hover:bg-mjcc-gold transition-colors">
                <Play className="w-6 h-6 text-mjcc-black ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="font-mono text-xs text-mjcc-cream/60 bg-mjcc-black/60 px-2 py-1">
                {duration}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-mjcc-cream">{title}</h3>
        <p className="text-xs text-mjcc-muted mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

const videos = [
  {
    title: "Why Television Talent Converts",
    description: "Jotham and Mira explain why brands see 4x higher ROAS with television verified creators.",
    thumbnailText: "BT",
    duration: "2:34",
  },
  {
    title: "Campaign Highlight Reel",
    description: "A look inside three campaigns that drove millions in attributed revenue for partner brands.",
    thumbnailText: "REEL",
    duration: "1:48",
  },
  {
    title: "Meet the Roster",
    description: "See the talent. Hear their stories. Understand why they are the most bookable creators in the market.",
    thumbnailText: "ROSTER",
    duration: "3:12",
  },
]

export function VideoShowcase() {
  return (
    <section className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            See It In Action
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-4xl text-mjcc-cream leading-tight"
          >
            Watch what verified talent looks like.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-md lg:max-w-5xl mx-auto">
          {videos.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <VideoCard {...video} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
