import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { ROUTES } from "../../config/routes";

const Navbar = () => {
  const location = useLocation();

  // Function to determine if the path belongs to Cicicom section
  const isCicicomSection = (pathname) => {
    return pathname.startsWith("/table") || pathname.startsWith("/map");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <h2>Cicicom</h2>
          <ul>
            <li>
              <Link to={ROUTES.CICICOM.TABLE}>Table</Link>
            </li>
            <li>
              <Link to={ROUTES.CICICOM.MAP}>Map</Link>
            </li>
          </ul>
        </li>
        <li>
          <h2>Internal</h2>
          <ul>
            <li>
              <Link to={ROUTES.INTERNAL.TABLE}>Table</Link>
            </li>
            <li>
              <Link to={ROUTES.INTERNAL.FORM}>Form</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
