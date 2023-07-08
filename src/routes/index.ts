import { Router } from "express";
import form from "../controller/form";
import category from "../controller/category";
import products from "../controller/products";
import blog from "../controller/blog";
import uslugy from "../controller/uslugy"
const router=Router()

// form
router.get("/form",form.Get);
router.get("/form/:id",form.GetId);
router.post("/form",form.Post);
router.put("/form/:id",form.Put);
router.delete("/form/:id",form.Delete);
// uslugy
router.get("/uslugy",uslugy.Get);
router.get("/uslugy/:id",uslugy.GetId);
router.post("/uslugy",uslugy.Post);
router.put("/uslugy/:id",uslugy.Put);
router.delete("/uslugy/:id",uslugy.Delete);

// blog
router.get("/blog",blog.Get);
router.get("/blog/:id",blog.GetId);
router.post("/blog",blog.Post);
router.put("/blog/:id",blog.Put);
router.delete("/blog/:id",blog.Delete);


// category
router.get("/category",category.Get);
router.get("/category/:id",category.GetId);
router.post("/category",category.Post);
router.put("/category/:id",category.Put);
router.delete("/category/:id",category.Delete);

// products
router.get("/products",products.Get);
router.get("/products/:id",products.GetId);
router.post("/products",products.Post);
router.put("/products/:id",products.Put);
router.delete("/products/:id",products.Delete);


export default router;