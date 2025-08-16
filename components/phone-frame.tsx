"use client"

import type React from "react"

interface PhoneFrameProps {
  children: React.ReactNode
  headerBg?: string
}

export default function PhoneFrame({
  children,
  headerBg = "bg-gradient-to-r from-amber-600 to-amber-800",
}: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl border-8 border-gray-800 overflow-hidden relative">
        {/* Status Bar */}
        <div
          className={`${headerBg} px-4 py-2 flex items-center justify-between text-white text-sm font-medium z-20 relative`}
        >
          <div className="flex items-center space-x-1">
            <span>9:41</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            </div>
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L3.15 12.95zM6.5 13l1.5-2.6L9.5 13H6.5zm5.5 0l1.5-2.6L15 13h-3zm5.5 0l1.5-2.6L20 13h-3z" />
            </svg>
            <span>100%</span>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-gray-800 rounded-b-xl z-30"></div>

        {/* Content */}
        <div className="h-full pt-0">{children}</div>
      </div>
    </div>
  )
}
