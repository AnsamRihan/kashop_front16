import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ForgotPaassword from "./pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/verifyCode/ResetPassword.jsx";
import Categories from "./pages/Categories/Categories.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/shop",
            element: <Products />,
        },
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/categories",
            element: <Categories />,
        } 
    ]
  },
  {
    element: <AuthLayout />,
    children: [
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },{
            path: "/forgot-password",
            element: <ForgotPaassword />,
        },{
            path: "/reset-password",
            element: <ResetPassword />,
        }
    ]
  }
]);

export default router;