import { Router} from "express";
import { requireAdmin } from "../middleware/Authentication.js";
import { getAllCategories ,createCategory, deleteCategory } from "../controllers/Product.controller.js";


const route = Router()

route.get('/',getAllCategories)
route.post('/add', requireAdmin,createCategory)
route.delete('/delete/:name',requireAdmin,deleteCategory)

export default route