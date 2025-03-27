import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "../axios";
import { useState, useEffect, createContext } from "react";
import Navbar from "../pages/Navbar";
import Products from "../pages/Products";
import ProductsPage2 from "../pages/ProductsPage2";

const AppContext = createContext({
  data: [],
  productsPage2Data: [],
  isError: "",
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData: () => {},
  fetchProductsPage2Data: () => {},
  updateStockQuantity: (productId, newQuantity) => {},
  clearCart: () => {},
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [productsPage2Data, setProductsPage2Data] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      let updatedCart;
      if (existingProductIndex !== -1) {
        updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const refreshData = async () => {
    try {
      const response = await axios.get("/products");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const fetchProductsPage2Data = async () => {
    try {
      const response = await axios.get("/productspage2");
      setProductsPage2Data(response.data);
    } catch (error) {
      console.error("Error fetching ProductsPage2 data:", error);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    refreshData();
    fetchProductsPage2Data();
  }, []);

  return (
    <AppContext.Provider value={{ data, productsPage2Data, isError, cart, addToCart, removeFromCart, refreshData, fetchProductsPage2Data, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
