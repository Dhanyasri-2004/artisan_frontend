import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsError(true);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <main className="products-main">
        <h3 className="products-title">PRODUCTS</h3>
        <div className="products-table-container">
          {isError ? (
            <p className="error-message">Failed to load products. Please try again later.</p>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-products">No Products Available</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Products;
