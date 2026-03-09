import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import KitchenDashboard from "./pages/KitchenDashboard";
import ImpactPage from "./pages/ImpactPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import StaffSystemPage from "./pages/StaffSystemPage";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:orderId" element={<OrderStatusPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/kitchen" element={<KitchenDashboard />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/staff" element={<StaffSystemPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
