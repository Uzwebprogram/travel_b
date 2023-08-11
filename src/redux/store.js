import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import AdminSlice from "./admin_add/index";
import ContactSlice from './contact/index';
import CategorySlice from './category/index'
import ProductSlice from './products/index'
import NewsSlice from './news/index'
import UslugySlice from "./uslugy/index"
import AparatSlice from "./aparat/index"
import CompanySlice from "./company/index"
import PereparatSlice from "./pereparat/index"
export const store = configureStore({
  reducer: {
    admin: authSlice,
    adminadd: AdminSlice,
    contact: ContactSlice,
    category: CategorySlice,
    product: ProductSlice,
    news: NewsSlice,
    uslugy : UslugySlice,
    aparat : AparatSlice,
    company : CompanySlice,
    pereparat : PereparatSlice
  },
});