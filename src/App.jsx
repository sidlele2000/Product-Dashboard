import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Product/Product";
import Order from "./pages/Order/Order";
import Roles from "./app/roles";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Roles allowedRoles={["admin", "user"]}>
            <Dashboard/>
          </Roles>
        }
      >
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Order />} />
      </Route>
    </Routes>
  );
}
