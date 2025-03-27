import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import "../styles/Product1.css";
import axios from "../axios";


const Product1 = () => {
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

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      alert("Product deleted successfully");
      refreshData();
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product2/update/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return <h2 className="text-center" style={{ padding: "10rem" }}>Loading...</h2>;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/images/logo.png" alt="Logo" />
          <span className="navbar-title">Artisan Alley</span>
        </div>
        <div className="navbar-links">
          <a href="/admin">Dashboard</a>
          <a href="/">Home</a>
        </div>
      </nav>

      {/* Product Page */}
      <div className="product2-container">
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

            {/* Buttons */}
            <div className="product2-actions">
              <button className={`product2-cart-btn ${!product.productAvailable ? "product2-disabled-btn" : ""}`}
                onClick={handleAddToCart} disabled={!product.productAvailable}>
                {product.productAvailable ? "Add to cart" : "Out of Stock"}
              </button>
              <button className="btn1" onClick={handleEditClick}>Update</button>
              <button className="btn2" onClick={deleteProduct}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product1;
