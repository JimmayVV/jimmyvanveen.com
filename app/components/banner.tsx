import * as React from "react"

export default function Banner({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="banner"
      className="pt-28 pb-32 bg-[auto,cover] -mb-24 bg-hero-pattern text-white uppercase font-raleway"
    >
      <div className="mx-auto my-0 w-[55em]">{children}</div>
    </section>
  )
}
