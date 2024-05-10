import express from "express";
import { getProducts , createProduct, getProduct, deleteProduct, updateProduct} from "../controllers/products.js"
const router = express.Router();

router.get("/products", getProducts)
router.get("/product/:id", getProduct)
router.post("/product", createProduct)
router.delete("/product/:id", deleteProduct)
router.put("/product/:id", updateProduct)

export default router;