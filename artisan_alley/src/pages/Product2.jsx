import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import "../styles/Product2.css";
import "../styles/ProductPage1.css";
import axios from "../axios";

const Product2 = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}/image`, { responseType: "blob" });
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2 className="text-center" style={{ padding: "10rem" }}>Loading...</h2>;
  }

  return (
    <div className="product2-container">
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

      <div className="product2-card">
        {/* Left Column - Image */}
        <div className="product2-image">
          <img src={imageUrl} alt={product.imageName} />
        </div>

        {/* Right Column - Product Details */}
        <div className="product2-details">
          <h2 className="product2-title">{product.name}</h2>
          <p className="product2-description"><strong>Brand:</strong> {product.brand}</p>
          <p className="product2-description"><strong>Category:</strong> {product.category}</p>
          <p className="product2-description"><strong>Description:</strong> {product.description}</p>
          <p className="product2-price"><strong>Price:</strong> ${product.price}</p>
          <p className="product2-description"><strong>Stock Available:</strong> {product.stockQuantity}</p>
          <p className="product2-description"><strong>Listed On:</strong> {new Date(product.releaseDate).toLocaleDateString()}</p>

          {/* Buttons */}
          <div className="product2-actions">
            <button
              className={`product2-cart-btn ${!product.productAvailable ? "product2-disabled-btn" : ""}`}
              onClick={() => addToCart(product)}
              disabled={!product.productAvailable}
            >
              {product.productAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product2;
