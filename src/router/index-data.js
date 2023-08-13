import { lazy } from "react";
import Cookies from "universal-cookie";
const Login = lazy(() => import("../pages/login/index"));
const AddAdmin = lazy(() => import("../pages/add_admin/index"));
const Contact = lazy(() => import("../pages/contact/index"));
const Category = lazy(() => import("../pages/category/index"));
const Product = lazy(() => import("../pages/products/index"));
const Blog = lazy(() => import("../pages/blog/index"));
const News = lazy(() => import("../pages/news/index"))
const Project = lazy(() => import("../pages/projects/index"))
const Aparat = lazy(() => import("./../pages/aparat/index"))
const Peraparat = lazy(() => import("./../pages/pereparat/index"))
const AparatProduct = lazy(() => import("./../pages/product-aparat/index"))
const cookie = new Cookies();


export const RouterData = [
  {
    id: 1,
    path: "/",
    component: <Login />,
  },
  {
    id: 2,
    path: "/adminadd",
    component: cookie.get("token") ? <AddAdmin /> : null,
  },
  {
    id: 3,
    path: "/contact",
    component: cookie.get("token") ? <Contact /> : null,
  },
  {
    id: 4,
    path: "/category",
    component: cookie.get("token") ? <Category /> : null,
  },
  {
    id: 5,
    path: "/product",
    component: cookie.get("token") ? <Product /> : null,
  },
  {
    id: 6,
    path: "/blog",
    component: cookie.get("token") ? <Blog /> : null,
  },
  {
    id: 6,
    path: "/project",
    component: cookie.get("token") ? <Project /> : null,
  },
  {
    id: 6,
    path: "/news",
    component: cookie.get("token") ? <News /> : null,
  },
  {
    id: 6,
    path: "/category-aparat",
    component: cookie.get("token") ? <Aparat /> : null,
  },
  {
    id: 6,
    path: "/category-pereparat",
    component: cookie.get("token") ? <Peraparat /> : null,
  },
  {
    id: 6,
    path: "/aparat-product",
    component: cookie.get("token") ? <AparatProduct /> : null,
  },
];

