import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./feature/Home/pages/Home";
import SellerDashboard from "./feature/SellerDashboard/pages/SellerDashboard";
import AdminDashboard from "./feature/AdminDashboard/pages/AdminDashboard";
import AdminProducts from "./feature/AdminDashboard/pages/AdminProducts";
import AddProduct from "./feature/AdminDashboard/pages/AddProduct";
import UpdateProduct from "./feature/AdminDashboard/pages/UpdateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route element={Home()} path="/" />
        <Route element={<SellerDashboard />} path="/seller" />
        <Route element={<AdminDashboard />} path="/admin" />
        <Route element={<AdminProducts />} path="/admin/products" />
        <Route element={<AddProduct />} path="/admin/products/add" />
        <Route element={<UpdateProduct />} path="/admin/products/update/:id" />
      </Routes>
    </>
  );
}

export default App;
