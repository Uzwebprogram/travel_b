import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { RouterData } from "./index-data";
import logo from "../assets/image/logocircle.png";
import Cookies from "universal-cookie";

import "./styles.css";
const Login = lazy(() => import("../pages/login/index"));
const AddAdmin = lazy(() => import("../pages/add_admin/index"));
const Contact = lazy(() => import("../pages/contact/index"));
const Category = lazy(() => import("../pages/category/index"));
const Product = lazy(() => import("../pages/products/index"));
const News = lazy(() => import("../pages/news/index"));

function RouterComponent() {
  const cookie = new Cookies();
  return (
    <>
      <div className="big_wrap">
        <Suspense
          fallback={
            <div className="logo-wrap">
              <img src={logo} alt="" />
            </div>
          }
        >
          <Routes>
            {/* <Route path="/" element={cookie.get("token") ? null : <Login />} />
            <Route path="/adminadd" element={cookie.get("token") ? <AddAdmin /> : null} />
            <Route path="/contact" element={cookie.get("token") ? <Contact /> : null} />
            <Route path="/category" element={cookie.get("token") ? <Category /> : null} />
            <Route path="/product" element={cookie.get("token") ? <Product /> : null} />
            <Route path="/news" element={cookie.get("token") ? <News /> : null} /> */}
            {RouterData.map((elem) => (
              <Route
                key={elem.id}
                path={elem.path}
                element={elem.component}
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default RouterComponent;
