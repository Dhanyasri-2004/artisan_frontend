import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import "../styles/DashboardUser.css";
import "../styles/ProductPage1.css";

const ProductsPage1 = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [isDataFetched, refreshData]);

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
              console.error(`Error fetching image for product ID: ${product.id}`, error);
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return <h2 className="artisan-error-message">Something went wrong...</h2>;
  }

  return (
    <div>
      {/* Artisan Alley Navbar */}
      <header className="artisan-header1">
        <div className="artisan-logo-container">
          <img src="/images/logo.png" alt="Logo" className="artisan-logo" />
          <div className="artisan-logo-text"><em>Artisan Alley</em></div>
        </div>
        <nav className="artisan-nav">
          <ul>
            <li><a href="/user">Home</a></li>
            <li><a href="#">Artisan Works</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Cart</a></li>
          </ul>
        </nav>
      </header>

      {/* Product Section */}
      <div className="artisan-product-gallery">
        {filteredProducts.length === 0 ? (
          <h2 className="artisan-no-products">No Products Available</h2>
        ) : (
          <div className="artisan-product-grid">
            {filteredProducts.map((product) => {
              const { id, brand, name, price, productAvailable, imageUrl } = product;
              return (
                <div
                  className={`artisan-product-card ${!productAvailable ? "out-of-stock" : ""}`}
                  key={id}
                >
                  <Link to={`/product2/${id}`} className="artisan-product-link">
                    <img src={imageUrl} alt={name} className="artisan-product-img" />
                    <div className="artisan-product-info">
                      <h5 className="artisan-product-title">{name.toUpperCase()}</h5>
                      <i className="artisan-product-brand">{"~ " + brand}</i>
                      <h5 className="artisan-product-price">{"$" + price}</h5>
                      <button
                        className="artisan-add-to-cart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={!productAvailable}
                      >
                        {productAvailable ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage1;
