// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

// Универсальный компонент страницы
interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ title }) => {
  return (
    <div className="page-content">
      <h1>{title}</h1>
      <p>Вы находитесь на странице «{title}».</p>
    </div>
  );
};

// Компонент навбара
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

// Главный компонент App
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        {/* main-content теперь flex-grow: 1 и центрирует контент */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Page title="Главная" />} />
            <Route path="/about" element={<Page title="О компании" />} />
            <Route path="/services" element={<Page title="Услуги" />} />
            <Route path="/contacts" element={<Page title="Контакты" />} />
            <Route path="*" element={<Page title="Ошибка 404" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
