import React from 'react';
import { Link } from 'gatsby';

export default function Nav({ onMenuToggle = () => {} }) {
  return (
    <nav id="menu">
      <div className="inner">
        <h2>Menu</h2>
        <ul className="links">
          <li>
            <Link
              onClick={e => {
                onMenuToggle();
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={e => {
                onMenuToggle();
              }}
              to="/blogs"
            >
              Blog
            </Link>
          </li>
          {/* We will still want to display available elements when developing for our use, but not when building for production */}
          {process.env.NODE_ENV === "development" && <li>
            <Link
              onClick={e => {
                onMenuToggle();
              }}
              to="/Elements"
            >
              Elements
            </Link>
          </li>}
        </ul>
        <a
          className="close"
          onClick={e => {
            e.preventDefault();
            onMenuToggle();
          }}
          href="#menu"
        >
          {''}
        </a>
      </div>
    </nav>
  );
}
