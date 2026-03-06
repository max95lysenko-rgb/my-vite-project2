import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Главная
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        О компании
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Услуги
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Контакты
      </NavLink>
    </nav>
  );
};

export default Navbar;
