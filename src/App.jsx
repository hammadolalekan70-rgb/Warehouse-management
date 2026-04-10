// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import { ProductProvider } from "./contexts/ProductContext";
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";

// YOUR EXISTING PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import ChatPage from "./pages/ChatPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProfilePage from "./pages/ProfilePage";

// NEW PAGES - Wishlist and Track Order
import WishlistPage from "./pages/WishlistPage";
import TrackOrderPage from "./pages/TrackOrderPage";

// HIDDEN ADMIN PAGES
import AdminLogin from "./pages/hidden/AdminLogin";
import AdminLayout from "./pages/hidden/AdminLayout"; // ✅ IMPORT LAYOUT
import AdminDashboard from "./pages/hidden/AdminDashboard";
import AdminOrders from "./pages/hidden/AdminOrders";
import AdminProducts from "./pages/hidden/AdminProducts";
import AdminPayments from "./pages/hidden/AdminPayments";
import AdminChat from "./pages/hidden/AdminChat";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <ChatProvider>
            <Header />
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/place-order" element={<PlaceOrderPage />} />

              {/* CUSTOMER DASHBOARD - WITH NESTED ROUTES */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="track" element={<TrackOrderPage />} />
                <Route path="track/:orderId" element={<TrackOrderPage />} />
                <Route path="place-order" element={<PlaceOrderPage />} />
              </Route>

              {/* HIDDEN ADMIN ROUTES - WITH LAYOUT */}
              <Route path="/hidden-admin-portal" element={<AdminLogin />} />
              
              {/* ✅ WRAPPED WITH AdminLayout FOR STICKY SIDEBAR */}
              <Route 
                path="/hidden-admin-portal/dashboard" 
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
              </Route>
              
              <Route 
                path="/hidden-admin-portal/orders" 
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminOrders />} />
              </Route>
              
              <Route 
                path="/hidden-admin-portal/products" 
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminProducts />} />
              </Route>
              
              <Route 
                path="/hidden-admin-portal/payments" 
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminPayments />} />
              </Route>
              
              <Route 
                path="/hidden-admin-portal/chat" 
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminChat />} />
              </Route>

              {/* 404 FALLBACK */}
              <Route path="*" element={<Home />} />
            </Routes>
          </ChatProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;