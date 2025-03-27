import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = ({ onSelectCategory }) => {
  const [categories] = useState([
    "Furniture",
    "Glass",
    "Ceramic",
    "Home Decor",
    "Toys",
    "Wooden Crafts",
    "HandWoven Baskets",
    
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?name=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleSearchClick = async () => {
    if (input.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?name=${input}`
        );
        if (response.data.length > 0) {
          setSearchResults(response.data);
          setNoResults(false);
        } else {
          setSearchResults([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
    setDropdownOpen(false);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/category/${category}`
      );
      setSearchResults(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <nav className="navbar1">
      <div className="navbar-left">
        {/* Logo & Title */}
        <div to="" className="logo-container">
          <img src="/images/logo.png" alt="Website Logo" className="logo-img" />
          <span className="logo-title">Artisan Alley</span>
        </div>
        {/* Home Link */}
        <div className="home2"><Link to="/admin" className="nav-link2">Home</Link></div>
       
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={input}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>🔍</button>

        {/* Search Results */}
        {showSearchResults && (
          <ul className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <li key={result.id}>
                  <Link to={`/product/${result.id}`} className="search-result-link">
                    {result.name}
                  </Link>
                </li>
              ))
            ) : (
              noResults && <li className="no-results-message">No product found</li>
            )}
          </ul>
        )}
      </div>

      {/* Categories Dropdown */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedCategory} ▼
        </button>
        {dropdownOpen && (
          <ul className="dropdown-menu">
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategorySelect(category)}>
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Product Button */}
      <Link to="/add-product" className="add-product-btn">
        + Add Product
      </Link>
      <Link to="/productspage2" className="add-product-btn1">
      View Product
      </Link>
    </nav>
  );
};

export default Navbar;
