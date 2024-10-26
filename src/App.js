import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import ProductListing from "./components/ProductListing";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import "./styles/variables.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductListing />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Signup />} />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
