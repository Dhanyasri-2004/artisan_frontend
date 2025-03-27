import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import "../styles/DashboardUser.css";

const slideImages = [
  "/images/userslide4.png",
  "/images/userslide2.png",
  "/images/userslide5.png",
  "/images/userslide3.png",
];

const DashboardUser = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Slideshow functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch products only once
  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  // Fetch images for products
  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image for product ID:", product.id, error);
              return { ...product, imageUrl: "/images/placeholder.png" };
            }
          })
        );
        setProducts(updatedProducts);
      };
      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  return (
    <div className="artisan-dashboard-wrapper">
      {/* Header */}
      <header className="artisan-header">
        <div className="artisan-logo-container">
          <img src="/images/logo.png" alt="Logo" className="artisan-logo" />
          <div className="artisan-logo-text"><em>Artisan Alley</em></div>
        </div>
        <nav className="artisan-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Artisan Works</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Cart</a></li>
          </ul>
        </nav>
      </header>

      {/* Slideshow */}
      <div className="artisan-slideshow">
        {slideImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Artisan Slideshow"
            className={`artisan-slideshow-image ${index === currentIndex ? "active" : ""}`}
          />
        ))}
        <div className="artisan-overlay"></div>
        <div className="artisan-slideshow-text">
          <h1>Celebrate Artisan Excellence</h1>
          <p>Explore handcrafted masterpieces by skilled artisans.</p>
          <Link to="/productsPage1" className="artisan-shop-now">
      Shop Now
    </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="artisan-excellence">
        <h2>Artisan Craftsmanship</h2>
        <p className="artisan-subtitle">
          Every piece tells a story of dedication and creativity.
        </p>

        <div className="artisan-content">
          <div className="artisan-features">
            <div className="artisan-feature">
              <i className="artisan-icon">✏️</i>
              <h3>Hand-Drawn Designs</h3>
              <p>Every creation starts with a visionary sketch.</p>
            </div>
            <div className="artisan-feature">
              <i className="artisan-icon">📚</i>
              <h3>Premium Materials</h3>
              <p>Only the finest materials are used in our crafts.</p>
            </div>
            <div className="artisan-feature">
              <i className="artisan-icon">🎁</i>
              <h3>Exclusive Collections</h3>
              <p>Rare and unique artisan works, perfect for gifting.</p>
            </div>
          </div>

          <div className="artisan-image-container">
            <img src="/images/logo.png" alt="Artisan Work" />
          </div>

          <div className="artisan-features">
            <div className="artisan-feature">
              <i className="artisan-icon">⏳</i>
              <h3>Timeless Creations</h3>
              <p>Each product carries years of heritage and skill.</p>
            </div>
            <div className="artisan-feature">
              <i className="artisan-icon">💎</i>
              <h3>Limited Editions</h3>
              <p>Handcrafted, rare pieces that stand out.</p>
            </div>
            <div className="artisan-feature">
              <i className="artisan-icon">❤️</i>
              <h3>Made with Love</h3>
              <p>Passion and dedication in every creation.</p>
            </div>
          </div>
        </div>
      </section>

{/* Product Section */}
<section className="artisan-product-gallery22">
  <h2 className="textc">Our Products</h2>
  <div className="artisan-product-grid">
    {products.length === 0 ? (
      <h2 className="artisan-no-products">No Products Available</h2>
    ) : (
      products.map((product) => (
        <div className="artisan-product-card" key={product.id}>
          <Link to={`/product2/${product.id}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="artisan-product-img"
            />
            <div className="artisan-product-info">
              <h5 className="artisan-product-title">{product.name.toUpperCase()}</h5>
              <p className="artisan-product-brand">~ {product.brand}</p>
              <h5 className="artisan-product-price">${product.price}</h5>
              <button
                className="artisan-add-to-cart-btn"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                disabled={!product.productAvailable}
              >
                {product.productAvailable ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </Link>
        </div>
      ))
    )}
  </div>
</section>

      <div className="contact-container">
  <div className="contact-content">
    {/* Left Section */}
    <div className="contact-left">
      <div className="contact-logo">
        <img src="/images/logo.png" alt="Artisan Alley Logo" className="contact-logo-img" />
        <span className="contact-logo-text">Artisan Alley</span>
      </div>
      <p className="contact-tagline">
        "Every handmade piece tells a story of tradition and passion."
      </p>
      <div className="contact-social-icons">
        <p><img src="/images/facebook.png" alt="Facebook" /> Facebook</p>
        <p><img src="/images/pintrest.png" alt="Pinterest" /> Pinterest</p>
        <p><img src="/images/instagram.png" alt="Instagram" /> Instagram</p>
      </div>
    </div>

    {/* Middle Section */}
    <div className="contact-middle">
      <h3>Contact Info</h3>
      <p><img src="/images/location.png" alt="Location" /> Andhra Pradesh, India</p>
      <p><img src="/images/phonecall.png" alt="Phone" /> (208) 555-0112</p>
      <p><img src="/images/mail.png" alt="Email" /> example@gmail.com</p>
    </div>

    {/* Right Section */}
    <div className="contact-right1">
      <h3>Contact Us</h3>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="contact-footer">
    <p>Copyright © 2025. All Rights Reserved. Artisan Alley</p>
  </div>
</div>

      </div>

  );
};

export default DashboardUser;
