import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardAdmin1.css";
import { BsFillArchiveFill, BsPeopleFill, BsFillBellFill } from "react-icons/bs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

function DashboardAdmin() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [customerCount, setCustomerCount] = useState(null);
  const [artisanCount, setArtisanCount] = useState(null);
  const [productCount, setProductCount] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole !== "admin") {
      navigate("/admin", { replace: true }); // Forces the user to stay on the admin page
    }
  }, [navigate]);

  useEffect(() => {
    if (role === "admin") {
      fetch("http://localhost:8080/api/user/users")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) setCustomerCount(data.length);
        })
        .catch((error) => console.error("Error fetching customer count:", error));

      fetch("http://localhost:8080/api/artisan/artisans")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) setArtisanCount(data.length);
        })
        .catch((error) => console.error("Error fetching artisan count:", error));

      fetch("http://localhost:8080/api/product/products")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProductCount(data.length);
          } else if (data.products && Array.isArray(data.products)) {
            setProductCount(data.products.length);
          }
        })
        .catch((error) => console.error("Error fetching product count:", error));
    }
  }, [role]);

  const data = [
    { name: "Jan", sales: 4000, customers: 2400 },
    { name: "Feb", sales: 3000, customers: 1398 },
    { name: "Mar", sales: 2000, customers: 9800 },
    { name: "Apr", sales: 2780, customers: 3908 },
    { name: "May", sales: 1890, customers: 4800 },
    { name: "Jun", sales: 2390, customers: 3800 },
    { name: "Jul", sales: 3490, customers: 4300 },
  ];

  return (
    <main className="admin-container">
      <div className="admin-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="admin-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{productCount !== null ? productCount : "Loading..."}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>ARTISANS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{artisanCount !== null ? artisanCount : "Loading..."}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{customerCount !== null ? customerCount : "Loading..."}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="customers" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DashboardAdmin;
