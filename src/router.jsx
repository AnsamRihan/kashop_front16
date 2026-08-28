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
import ProtectedRouter from "./ProtectedRouter.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import Product from "./pages/Product/Product.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess.jsx";
import ProfileLayout from "./layouts/ProfileLayout.jsx";
import ProfileInfo from "./pages/Profile/ProfileInfo.jsx";
import OrdersInfo from "./pages/Profile/OrdersInfo.jsx";
import Blog from "./pages/blog/Blog.jsx";
import About from "./pages/aboutUs/About.jsx";
import FAQs from "./pages/FAQs/FAQs.jsx";
import Contact from "./pages/contactUs/Contact.jsx";

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
            path: "/product/:id",
            element: <Product />,
        },
        {
            path: "/blog",
            element: <Blog />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/FAQs",
            element: <FAQs />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
        {
            path: "/cart",
            element: 
                <ProtectedRouter>
                    <Cart />
                </ProtectedRouter>,
        },
        {
            path: "/order-success",
            element: 
                <ProtectedRouter>
                    <OrderSuccess />
                </ProtectedRouter>,
        },
        {
            path: "/checkout",
            element: 
                <ProtectedRouter>
                    <Checkout />
                </ProtectedRouter>,
        },
        {
            path: "/categories",
            element: <Categories />,
        },{
            path: "/profile",
            element:
                <ProtectedRouter>
                    <ProfileLayout />
                </ProtectedRouter>,
            children:[
                {
                    index: true,
                    element: <ProfileInfo />
                },{
                    path:"orders",
                    element:<OrdersInfo />
                }
            ]
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