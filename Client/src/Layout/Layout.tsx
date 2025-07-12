import React, { useState } from "react";
import { Link } from "react-router";
import { Outlet } from "react-router";
import type { NavType } from "../types/layout.types";
function Layout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const links: NavType[] = [
    { text: "Home", link: "/" },
    { text: "Account", link: "/account" },
  ];
  return (
    <div className="container">
      <nav>
        <div className="navbar-logo">
          <Link to="/">Sync Do</Link>
        </div>
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          {links.map((item) => (
            <Link key={item.text} to={item.link}>
              {item.text}
            </Link>
          ))}
        </div>

        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
