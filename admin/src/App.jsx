import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AddProduct from "./pages/addProducts.jsx";
import UpdateProduct from "./pages/updateProducts.jsx";
import ViewProducts from "./pages/viewProducts.jsx";
import Orders from "./pages/orders.jsx";
import ShowUsers from "./pages/showUsers.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "Rs. ";

const App = () => {
  const [token, setToken] = useState(
    sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
  );

  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <div>
        {token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Routes>
              {/* <Route path="/" element={<Sidebar setToken={setToken} />} /> */}
              <Route
                path="/"
                element={<AddProduct token={token} setToken={setToken} />}
              />
              <Route
                path="/update"
                element={<UpdateProduct token={token} setToken={setToken} />}
              />
              <Route
                path="/view"
                element={<ViewProducts token={token} setToken={setToken} />}
              />
              <Route
                path="/orders"
                element={<Orders token={token} setToken={setToken} />}
              />
              <Route
                path="/users"
                element={<ShowUsers token={token} setToken={setToken} />}
              />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default App;
