import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import ClientDetails from "./pages/Clients/ClientDetails";
import ClientForm from "./pages/Clients/ClientForm";

import ProductDetails from "./pages/Products/ProductDetails";
import ProductForm from "./pages/Products/ProductForm";

import OrderDetails from "./pages/Orders/OrderDetails";
import OrderForm from "./pages/Orders/OrderForm";

import Users from "./pages/Users/UsersList";

import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

import AuthGuard from "./guards/AuthGuard";
import RoleGuard from "./guards/RoleGuard";
import UserForm from "./pages/Users/UserForm.jsx";
import ProductsList from "./pages/Products/ProductsList";
import ClientsList from "./pages/Clients/ClientsList";
import OrdersList from "./pages/Orders/OrdersList";
import UserDetails from "./pages/Users/UserDetails";
import Layout from "./components/Layout.jsx";
import AuthRedirect from "./guards/AuthRedirect.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
                <Route path="/login" element={
                    <AuthRedirect>
                        <Login />
                    </AuthRedirect>

                } />
                <Route path="/register" element={
                    <AuthRedirect>
                        <Register />
                    </AuthRedirect>
                } />

          <Route path="/access-denied" element={<AccessDenied />} />


          <Route element={<AuthGuard />}>
              <Route element={<Layout />}>
              <Route
                    element={<RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]} /> } >

                      <Route path="dashboard" element={<Dashboard />} />

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

                      <Route path="clients/add" element={<ClientForm />} />
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