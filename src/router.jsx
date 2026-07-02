import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "products",
            element: <Products />,
        },
        {
            path: "cart",
            element: <Cart />,
        },
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "login",
            element: <Login />,
        }
    ]
  },
]);

export default router;