import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MedExchange</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload" className={({ isActive }) => (isActive ? "active" : "")}>
            Upload Medicines
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>
            Search Medicines
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
