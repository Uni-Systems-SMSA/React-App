// Navbar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

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
              <Link to="/table">Table</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </li>
        <li>
          <h2>Internal</h2>
          <ul>
            <li>
              <Link to="/table-test">TableTest</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
