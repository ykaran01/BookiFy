import {requireAdmin , requireAuth  } from "../middleware/Authentication.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProducts, deleteProduct, getAllProducts, getProductById, getProductsByCategory, searchProducts, updateProduct } from "../controllers/Product.controller.js";
const productrouter = Router();
productrouter.post('/add',  requireAdmin, upload.single('image'), addProducts)
productrouter.put('/update/:id', requireAdmin, updateProduct);
productrouter.get('/all', getAllProducts);
productrouter.get('/get/:categoryId', requireAuth, getProductsByCategory)
productrouter.get('/getproduct/:id', requireAuth, getProductById)
productrouter.get('/search', searchProducts)
productrouter.delete('/delete/:id', requireAdmin, deleteProduct)
export default productrouter