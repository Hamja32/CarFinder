// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Wishlist from "./pages/Wishlist";

import { WishlistProvider } from "./context/WishlistContext";
import "./index.css"; // TailwindCSS or global styles

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="car/:id" element={<CarDetails />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
