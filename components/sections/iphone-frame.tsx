"use client"

import { ReactNode } from "react"

export function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Desktop: black background with centered iPhone */}
      <div className="hidden lg:flex items-center justify-center min-h-screen bg-black fixed inset-0 z-0">
        <div className="relative flex-shrink-0" style={{ width: 393, height: 852 }}>
          {/* iPhone outer shell */}
          <div className="iphone-keep-radius absolute inset-[-3px] rounded-[58px] bg-gradient-to-b from-[#3A3A3A] to-[#1A1A1A]" />

          {/* iPhone inner bezel */}
          <div className="iphone-keep-radius absolute inset-0 rounded-[55px] bg-[#0A0A0A] overflow-hidden">
            {/* Dynamic Island */}
            <div className="iphone-keep-radius absolute top-[12px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />

            {/* Status bar area */}
            <div className="absolute top-0 left-0 right-0 h-[59px] z-40 flex items-end justify-between px-8 pb-1 bg-gradient-to-b from-[#0A0A0A] to-transparent">
              <span className="text-[13px] font-semibold text-white">9:41</span>
              <div className="flex items-center gap-1.5">
                {/* Signal bars */}
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <rect x="0" y="9" width="3" height="3" rx="0.5" fill="white" />
                  <rect x="5" y="6" width="3" height="6" rx="0.5" fill="white" />
                  <rect x="10" y="3" width="3" height="9" rx="0.5" fill="white" />
                  <rect x="15" y="0" width="3" height="12" rx="0.5" fill="white" />
                </svg>
                {/* Wi-Fi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="white" />
                  <path d="M4.5 8.5a5 5 0 017 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M1.5 5.5a9 9 0 0113 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {/* Battery */}
                <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                  <rect x="0.5" y="0.5" width="23" height="12" rx="2" stroke="white" strokeOpacity="0.35" />
                  <rect x="2" y="2" width="20" height="9" rx="1" fill="white" />
                  <path d="M25 4.5v4a2 2 0 000-4z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Scrollable content area */}
            <div
              className="h-full overflow-y-auto overflow-x-hidden iphone-scroll-container"
              style={{ transform: "translateZ(0)" }}
            >
              {children}
            </div>

            {/* Home indicator */}
            <div className="iphone-keep-radius absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-50" />
          </div>

          {/* Subtle outer glow */}
          <div className="iphone-keep-radius absolute -inset-[20px] rounded-[75px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Mobile: render normally */}
      <div className="lg:hidden">
        {children}
      </div>
    </>
  )
}
