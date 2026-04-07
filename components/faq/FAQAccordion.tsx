"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { FAQItem } from "@/lib/faq-data"

interface FAQAccordionProps {
  items: FAQItem[]
  limit?: number
}

export function FAQAccordion({ items, limit }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const displayItems = limit ? items.slice(0, limit) : items

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      {displayItems.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={index} className="border-b border-mjcc-dark">
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="text-[15px] font-medium text-mjcc-cream pr-4">
                {item.question}
              </span>
              <span
                className={`text-mjcc-gold text-xl leading-none shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-mjcc-warm leading-relaxed pt-1 pb-5">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
