import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Configurador router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Importa as Pages para criar as rotas
import Login from './Pages/Login/Login.jsx';
import Stock from './Pages/Stock/Stock.jsx';
import PageError from './Pages/PageError/PageError.jsx';
import AuthenticationLayout from './AutenticationLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",  //Define a rota do Login como rota principal
        element: <Login />
      },
      {
        element: <AuthenticationLayout />,
        children: [
          {
            path: "stock",
            element: <Stock />
          },
          {
            path: "*",
            element: <PageError />,
          },
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
