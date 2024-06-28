// Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>{/* <Link to="/parking">Parking Dashboard</Link> */}</li>
        {/* <li>
          <Link to="/smart-bins">Smart Bins Dashboard</Link>
        </li> */}
        <li>{/* <Link to="/drones">Drones Dashboard</Link> */}</li>
        <li>
          <Link to="/table">Table</Link>
        </li>
        <li>
          <Link to="/table-test">TableTest</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/form">Form</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
