import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//Configurador router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Importa o Header
import Header from "./componentes/Header.jsx";

//Importa as Pages para criar as rotas
import Login from "./Pages/Login/Login.jsx";
import Stock from "./Pages/Stock/Stock.jsx";
import Products from "./Pages/Products/Products.jsx";
import PageError from "./Pages/PageError/PageError.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", //Define a rota do Login como rota principal
        element: <Login />,
      },
      {
        path: "stock",
        element: (
          <>
            <Header />
            <Stock />
          </>
        ),
      },
      {
        path: "products",
        element: (
          <>
            <Header />
            <Products />
          </>
        ),
      },
      {
        path: "*",
        element: <PageError />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
