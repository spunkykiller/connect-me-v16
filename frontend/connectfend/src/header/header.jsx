import "./header.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.webp";
import headerLogo from "../assets/connectME_logo_transparent.webp";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

import ProductsDropdown from "./productsDropdown.jsx";
import ServicesDropdown from "./ServicesDropdown.jsx";

// Import data for mobile menu
import productData from "../data/productData";
import serviceData from "../data/serviceData";

export default function Header() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState("");

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeAll = () => setOpenDropdown("");
    window.addEventListener("click", closeAll);
    return () => window.removeEventListener("click", closeAll);
  }, []);

  const toggleDropdown = (type, e) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === type ? "" : type);
  };

  const handleMenuClick = () => {
    setOpenDropdown("");
    setMobileMenuOpen(false);
    setActiveMobileSection("");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) setActiveMobileSection(""); // Reset on open
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveMobileSection("");
  }

  const toggleMobileSection = (section) => {
    setActiveMobileSection(activeMobileSection === section ? "" : section);
  };

  // --- Render Helpers for Mobile Menu ---

  const renderMobileProducts = () => {
    return productData.map((category, catIdx) => (
      <div key={catIdx} className="mobile-section">
        <h3 className="mobile-cat-header">{category.category}</h3>
        {category.subcategories
          .filter((sub) => sub.slug !== "lorawan-gateway")
          .map((sub, sIdx) => (
            <Link
              key={sIdx}
              to={`/products/${category.slug}/${sub.slug}`}
              className="mobile-item"
              onClick={handleMenuClick}
            >
              {sub.name}
            </Link>
          ))}
      </div>
    ));
  };


  const renderMobileSolutions = () => {
    const solutions = serviceData.find(d => d.category === "Solutions");
    if (!solutions) return null;

    return (
      <div className="mobile-section">
        {solutions.items.map((item, i) => (
          <Link
            key={i}
            to={`/services/${solutions.slug}/${item.id}`}
            className="mobile-item"
            onClick={handleMenuClick}
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  }

  const renderMobileServices = () => {
    const services = serviceData.find(d => d.category === "Services");
    if (!services) return null;

    return (
      <div className="mobile-section">
        {services.items.map((item, i) => (
          <Link
            key={i}
            to={`/services/${services.slug}/${item.id}`}
            className="mobile-item"
            onClick={handleMenuClick}
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  }


  return (
    <header className="header">

      {/* LOGO */}
      <div className="logo">
        <a href="/">
          <img src={headerLogo} alt="ConnectME" className="logo-img" />
        </a>
      </div>

      {/* HAMBURGER ICON */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <FaBars />
      </div>

      {/* DESKTOP NAV */}
      <nav className="desktop-nav">
        <ul>
          {/* PRODUCTS DROPDOWN */}
          <li>
            <span
              className={`nav-link ${location.pathname.startsWith("/products") ? "active" : ""}`}
              onClick={(e) => toggleDropdown("products", e)}
            >
              Products
            </span>
            {openDropdown === "products" && (
              <ProductsDropdown onClose={handleMenuClick} />
            )}
          </li>

          {/* SOLUTIONS DROPDOWN */}
          <li>
            <span
              className={`nav-link ${location.pathname.includes("/solutions") ? "active" : ""}`}
              onClick={(e) => toggleDropdown("solutions", e)}
            >
              Solutions
            </span>
            {openDropdown === "solutions" && (
              <ServicesDropdown onClose={handleMenuClick} specificCategory="Solutions" />
            )}
          </li>

          {/* SERVICES LINK (Direct) */}
          <li>
            <Link
              to="/services"
              className={`nav-link ${location.pathname === "/services" || (location.pathname.startsWith("/services") && !location.pathname.includes("/solutions")) ? "active" : ""}`}
              onClick={handleMenuClick}
            >
              Services
            </Link>
          </li>

          <li>
            <Link
              to="/work"
              className={`nav-link ${location.pathname.startsWith("/work") ? "active" : ""}`}
              onClick={handleMenuClick}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`nav-link ${location.pathname.startsWith("/blog") ? "active" : ""}`}
              onClick={handleMenuClick}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${location.pathname.startsWith("/about") ? "active" : ""}`}
              onClick={handleMenuClick}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* CONTACT BUTTON (Desktop Only) */}
      <Link to="/contact" className="contact-btn desktop-only">Contact</Link>


      {/* MOBILE MENU OVERLAY (Accordion Style) */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? "active" : ""}`}>

        {/* Sticky Header */}
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <div className="mobile-close-btn" onClick={closeMobileMenu}>
            <FaTimes />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="mobile-menu-content">

          {/* 1. Products (Accordion) */}
          <div className="mobile-accordion-group">
            <div
              className={`mobile-main-item ${activeMobileSection === "products" ? "active" : ""}`}
              onClick={() => toggleMobileSection("products")}
            >
              <span>Products</span>
              {activeMobileSection === "products" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {activeMobileSection === "products" && (
              <div className="mobile-sub-menu-container">
                {renderMobileProducts()}
              </div>
            )}
          </div>

          {/* 2. Solutions (Accordion) */}
          <div className="mobile-accordion-group">
            <div
              className={`mobile-main-item ${activeMobileSection === "solutions" ? "active" : ""}`}
              onClick={() => toggleMobileSection("solutions")}
            >
              <span>Solutions</span>
              {activeMobileSection === "solutions" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {activeMobileSection === "solutions" && (
              <div className="mobile-sub-menu-container">
                {renderMobileSolutions()}
              </div>
            )}
          </div>

          {/* 3. Services (Direct Link) */}
          <Link to="/services" className="mobile-main-item link" onClick={handleMenuClick}>
            Services
          </Link>

          {/* 4. Work */}
          <Link to="/work" className="mobile-main-item link" onClick={handleMenuClick}>
            Work
          </Link>

          {/* 5. Blog */}
          <Link to="/blog" className="mobile-main-item link" onClick={handleMenuClick}>
            Blog
          </Link>

          {/* 6. About */}
          <Link to="/about" className="mobile-main-item link" onClick={handleMenuClick}>
            About
          </Link>

          {/* 7. Contact */}
          <Link to="/contact" className="mobile-main-item link" onClick={handleMenuClick}>
            Contact
          </Link>

        </div>
      </div>

    </header>
  );
}


