import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

export default function Nav({ onMenuToggle = () => {} }) {
  return (
    <nav id="menu">
      <div className="inner">
        <h2>Menu</h2>
        <ul className="links">
          <li>
            <Link onClick={onMenuToggle} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={onMenuToggle} to="/blogs">
              Blog
            </Link>
          </li>
          {/* We will still want to display available elements when developing for our use, but not when building for production */}
          {process.env.NODE_ENV === "development" && (
            <li>
              <Link onClick={onMenuToggle} to="/Elements">
                Elements
              </Link>
            </li>
          )}
        </ul>
        <a
          className="close"
          onClick={e => {
            e.preventDefault()
            onMenuToggle()
          }}
          href="#menu"
        >
          {""}
        </a>
      </div>
    </nav>
  )
}

Nav.propTypes = {
  onMenuToggle: PropTypes.func,
}
