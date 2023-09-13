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
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import CompraEVenda from "./Pages/CompraEVenda/CompraEVenda.jsx";
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
        path: "compraevenda",
        element: (
          <>
            <Header />
            <CompraEVenda />
          </>
        ),
      },
      {
        path: "*",
        element: <PageError />,
      },
      {
        path: "dashboard",
        element: (
          <>
            <Header />
            <Dashboard />,
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
