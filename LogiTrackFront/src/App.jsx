import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Clients from "./pages/clients/ClientsList";
import ClientDetails from "./pages/clients/ClientDetails";
import ClientForm from "./pages/clients/ClientForm";

import Products from "./pages/products/ProductsList";
import ProductDetails from "./pages/products/ProductDetails";
import ProductForm from "./pages/products/ProductForm";

import Orders from "./pages/orders/OrdersList";
import OrderDetails from "./pages/orders/OrderDetails";
import OrderForm from "./pages/orders/OrderForm";

import Users from "./pages/users/UsersList";

import Profile from "./pages/users/UserDetails";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

import AuthGuard from "./guards/AuthGuard";
import RoleGuard from "./guards/RoleGuard";
import UserForm from "./pages/Users/UserForm.jsx";
import ProductsList from "./pages/products/ProductsList";
import ClientsList from "./pages/clients/ClientsList";
import OrdersList from "./pages/orders/OrdersList";
import UserDetails from "./pages/users/UserDetails";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-denied" element={<AccessDenied />} />


          <Route element={<AuthGuard />}>
                <Route
                    element={<RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]} /> } >

                      <Route path="clients" element={<ClientsList />} />
                      <Route path="clients/:id" element={<ClientDetails />} />

                      <Route path="products" element={<ProductsList />} />
                      <Route path="products/:id" element={<ProductDetails />} />

                      <Route path="orders" element={<OrdersList />} />
                      <Route path="orders/:id" element={<OrderDetails />} />

                      <Route path="profile" element={<UserDetails />} />
                </Route>


                <Route
                    element={ <RoleGuard roles={["ADMIN", "MANAGER"]} /> } >

                      <Route path="dashboard" element={<Dashboard />} />

                      <Route path="clients/new" element={<ClientForm />} />
                      <Route path="clients/edit/:id" element={<ClientForm />} />

                      <Route path="products/new" element={<ProductForm />} />
                      <Route path="products/edit/:id" element={<ProductForm />} />

                      <Route path="orders/new" element={<OrderForm />} />
                      <Route path="orders/edit/:id" element={<OrderForm />} />
                </Route>


                <Route
                    element={<RoleGuard roles={["ADMIN"]} /> }>

                      <Route path="users" element={<Users />} />
                      <Route path="users/edit/:id" element={<UserForm />} />

                </Route>
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
      />
      </BrowserRouter>
  );
}

export default App;