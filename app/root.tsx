import type { MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import Footer from "~/components/footer"
import Menu from "~/components/menu"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Jimmy Van Veen",
  viewport: "width=device-width,initial-scale=1",
})

import styles from "./styles/app.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

const MIN_WIDTH = 320

export default function App() {
  return (
    <html lang="en" className={`min-w-[${MIN_WIDTH}px] box-border`}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className={`min-w-[${MIN_WIDTH}px]`}>
        <Menu />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
