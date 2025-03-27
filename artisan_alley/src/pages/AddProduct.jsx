import React, { useState } from "react";
import "../styles/AddProduct.css";
import Sidebar from "../pages/Sidebar";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: null,
    productAvailable: false,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDateChange = (date) => {
    setProduct({ ...product, releaseDate: date });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));

    try {
      await axios.post("http://localhost:8080/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully");
      setProduct({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: null,
        productAvailable: false,
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      <main className="main-content">
        <h3 className="page-title">Add Product</h3>

        <div className="product-container">
          <form className="product-form" onSubmit={submitHandler}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Product Name" />
            </div>

            <div className="input-group">
              <label>Brand</label>
              <input type="text" name="brand" value={product.brand} onChange={handleInputChange} placeholder="Brand Name" />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea name="description" value={product.description} onChange={handleInputChange} placeholder="Product Description"></textarea>
            </div>

            <div className="input-group">
              <label>Price</label>
              <input type="number" name="price" value={product.price} onChange={handleInputChange} placeholder="Price" />
            </div>

            <div className="input-group">
              <label>Category</label>
              <select name="category" value={product.category} onChange={handleInputChange}>
                <option value="">Select category</option>
                <option value="Furniture">Furniture</option>
                <option value="Glass">Glass</option>
                <option value="Ceramic">Ceramic</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Toys">Toys</option>
                <option value="Wooden Crafts">Wooden Crafts</option>
                <option value="HandWoven Baskets">HandWoven Baskets</option>
              </select>
            </div>

            <div className="input-group">
              <label>Stock Quantity</label>
              <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleInputChange} placeholder="Stock Quantity" />
            </div>

            <div className="input-group">
              <label>Release Date</label>
              <DatePicker
                selected={product.releaseDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                className="date-picker"
              />
            </div>

            <div className="input-group">
              <label>Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="productAvailable"
                  checked={product.productAvailable}
                  onChange={(e) => setProduct({ ...product, productAvailable: e.target.checked })}
                />
                Product Available
              </label>
            </div>

            <button type="submit" className="submit-btn">Add Product</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
