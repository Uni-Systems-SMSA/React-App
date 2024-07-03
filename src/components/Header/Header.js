// src/components/Header/Header.js

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo_unisystems from "../../assets/logo_unisystems.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src={logo_unisystems} alt="App Logo" />
            </Link>
          </div>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
