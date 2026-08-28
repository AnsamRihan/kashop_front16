import { House, Shapes, ShoppingBag, Mail, BookText, CircleQuestionMark, Newspaper } from "lucide-react";

export const navLinks = [
    {
      key: "home",
      path: "/",
      icon: House,
    },
    {
      key: "shop",
      path: "/shop",
      icon: ShoppingBag,
    },
    {
      key: "categories",
      path: "/categories",
      icon: Shapes ,
    },
    {
      key: "about",
      path: "/about",
      icon: BookText
    },
    {
      key: "contact",
      path: "/contact",
      icon: Mail
    },
    {
      key: "faqs",
      path: "/FAQs",
      icon: CircleQuestionMark
    },
    {
      key: "blog",
      path: "/blog",
      icon: Newspaper
    }
  ]