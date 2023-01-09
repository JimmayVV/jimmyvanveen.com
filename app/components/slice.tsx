import * as React from "react"

import { type HexColor, getSlice } from "~/utils/layout-utils"

export default function Slice({
  children,
  color = "#21d",
  flip = false,
}: {
  children: React.ReactNode
  color?: HexColor
  flip?: boolean
}) {
  return (
    <div className="relative -mt-8 md:-mt-16 lg:-mt-[7.1rem]">
      <div
        className={`h-8 md:h-16 lg:h-28 w-full bg-no-repeat left-0 ${
          flip ? "-scale-x-100" : ""
        }`}
        style={{
          backgroundImage: `url("${getSlice(color)}")`,
          boxShadow: `inset 0 -1px 0 0 ${color}, 0 1px 0 0 ${color}`,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="px-12 py-4" style={{ backgroundColor: color }}>
        {children}
      </div>
      <div
        className={`h-8 md:h-16 lg:h-28 w-full bg-no-repeat left-0 -scale-y-100 ${
          flip ? "-scale-x-100" : ""
        }`}
        style={{
          backgroundImage: `url("${getSlice(color)}")`,
          boxShadow: `inset 0 -1px 0 0 ${color}, 0 1px 0 0 ${color}`,
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  )
}
