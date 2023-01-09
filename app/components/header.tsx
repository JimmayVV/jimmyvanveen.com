import { Link } from "@remix-run/react"

export function Header() {
  return (
    <header className="bg-[rgba(59,59,59,.95)] z-10 h-14 fixed top-0 w-full pl-5">
      <h1 className="uppercase text-white tracking-widest font-bold leading-[3.5rem]">
        <Link to="/" prefetch="intent">
          JimmyVanVeen.com
        </Link>
      </h1>
    </header>
  )
}

export default Header
