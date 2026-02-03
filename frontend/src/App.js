
import { MdDashboard } from 'react-icons/md';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Customer from './pages/customer';
import MainGrid from './components/MainGrid';
import Catlog from './pages/catlog';
import CatlogDetails from './components/catlogDetails';
import Product from './pages/product';
import OnlineStore from './pages/onlineStore';
import ProductGrid from './components/ProductCart/productGrid';
import ProductDetails from './components/ProductCart/productDetails';
import Orders from './pages/orders';

import ProtectedRoute from './routes/ProtectedRoutes';
import AuthRoute from './routes/AuthRoutes';
function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes (no access after login) */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes (login required) */}
        <Route element={<ProtectedRoute />}>

          {/* Admin Dashboard */}
          <Route path="/dashboard" element={<Dashboard role="admin" />}>
            <Route index element={<MainGrid />} />
            <Route path="customers" element={<Customer />} />
            <Route path="catlog" element={<Catlog />} />
            <Route path="catlog/:id" element={<CatlogDetails />} />
            <Route path="order" element={<Orders />} />
          </Route>

          {/* Online Store */}
          <Route path="/onlinestore" element={<OnlineStore />}>
            <Route index element={<ProductGrid />} />
            <Route path="product/:id" element={<ProductDetails />} />
          </Route>

          {/* Customer Dashboard */}
          <Route path="/customer" element={<Dashboard role="customer" />}>
            <Route index element={<MainGrid />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
