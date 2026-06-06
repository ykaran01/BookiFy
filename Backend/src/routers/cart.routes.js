import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/Authentication.js";
import { getCart, putElementincart  } from "../controllers/cart.controller.js";
const cartRouter = Router()
cartRouter.get('/items', requireAuth, getCart)
cartRouter.patch('/additems', requireAuth, putElementincart)
export default cartRouter