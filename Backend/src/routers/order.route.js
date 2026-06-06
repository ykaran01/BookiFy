import { Router
 } from "express";
import {requireAdmin, requireAuth } from "../middleware/Authentication.js";
import { orderController,changeOrderStatus,userOrderHistory,getAll,getAllOrders ,getTheinformation } from "../controllers/order.contoller.js";
const orderRouter = Router()

orderRouter.post('/place', requireAuth, orderController)
orderRouter.put('/status/:orderId/:status', requireAdmin, changeOrderStatus)
orderRouter.get('/history', requireAuth, userOrderHistory)
orderRouter.get('/rest',requireAdmin,getAll)
orderRouter.get('/all',requireAdmin,getAllOrders)
orderRouter.get('/info',requireAdmin,getTheinformation)
export default orderRouter