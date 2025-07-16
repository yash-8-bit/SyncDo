import { useEffect, useState, type JSX } from "react";
import { Link, useNavigate } from "react-router";
import { Outlet } from "react-router";
import type { NavType } from "../types/layout.types";
import ls from "../utils/ls";

// Layout of Website include Navbar and Pages in main tag
function Layout():JSX.Element {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const links: NavType[] = [
    { text: "Home", link: "/" },
    { text: "Add task", link: "/add-task" },
    { text: "Account", link: "/account" },
  ];
  const run = (): void => {
    if (!ls.get()) navigate("/account-login");
  };
  useEffect(() => {
    run();
  }, []);
  return (
    <div className="container">
      <nav>
        <div className="navbar-logo font">
          <Link to="/">Sync Do</Link>
        </div>
        <div className={`navbar-links font ${isOpen ? "active" : ""}`}>
          {links.map((item) => (
            <Link
              onClick={() => setIsOpen(false)}
              key={item.text}
              to={item.link}
            >
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
