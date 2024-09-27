import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Login } from "./login.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/userContext.tsx";
import { DetalhesProduto } from "./modules/Produto/index.tsx";
import { Layout } from "./Layout/index.tsx";
import { Cadastro } from "./modules/cadastro/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div> Ops! algo deu errado </div>,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/produto/:id",
        element: <DetalhesProduto />
      },
      {
        path: "/cadastrar",
        element: <Cadastro />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);
