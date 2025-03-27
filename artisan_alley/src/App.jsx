import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signup1 from "./pages/Signup1";
import DashboardArtisan from "./pages/DashboardArtisan";
import DashboardUser from "./pages/DashboardUser";
import MainLayout from "./MainLayout";  
import ProductsPage1 from "./pages/ProductsPage1";
import Products from "./pages/Products"; 
import ProductsPage2 from "./pages/ProductsPage2"; // ✅ Fixed name
import Product1 from "./pages/Product1"; 
import Product2 from "./pages/Product2"; 
import AddProduct from "./pages/AddProduct"; 
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./pages/UpdateProduct";
import Navbar from "./pages/Navbar";
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

function AppContent() {
  const [cart, setCart] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <>
      {/* ✅ Navbar will now be visible on all /products pages and subroutes */}
      {location.pathname.startsWith("/products") && (
        <Navbar onSelectCategory={handleCategorySelect} />
      )}

      <Routes>
        <Route
          path="/products"
          element={
            <Products addToCart={addToCart} selectedCategory={selectedCategory} />
          }
        />
        <Route
          path="/productspage2"
          element={
            <ProductsPage2 addToCart={addToCart} selectedCategory={selectedCategory} />
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/admin" element={<MainLayout />} />
        <Route path="/user" element={<DashboardUser />} />
        <Route path="/artisan" element={<DashboardArtisan />} />
        <Route path="/productsPage1" element={<ProductsPage1 />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product1/update/:id" element={<UpdateProduct />} />
        <Route path="/product1" element={<Product1 />} />
        <Route path="/product1/:id" element={<Product1 />} />
        <Route path="/product2/update/:id" element={<UpdateProduct />} />
        <Route path="/product2" element={<Product2 />} />
        <Route path="/product2/:id" element={<Product2 />} />
      </Routes>
    </>
  );
}

export default App;
