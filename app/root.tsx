import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
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

interface LoaderData {
  recaptchaKey: string
}

export const loader: LoaderFunction = async () => {
  const recaptchaKey: string = process.env.RECAPTCHA_SITE_KEY as string
  return json<LoaderData>({ recaptchaKey })
}

const MIN_WIDTH = 320

export default function App() {
  const { recaptchaKey } = useLoaderData<LoaderData>()

  return (
    <html lang="en" className={`min-w-[${MIN_WIDTH}px] box-border`}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className={`min-w-[${MIN_WIDTH}px]`}>
        <Menu />
        <Outlet />
        <Footer recaptchaKey={recaptchaKey} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
