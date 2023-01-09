// Libs
import { Outlet } from "@remix-run/react"

// Components
import Header from "~/components/header"

export default function Blog() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
