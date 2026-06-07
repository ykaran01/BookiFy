import { Router
 } from "express";
import {requireAdmin, requireAuth } from "../middleware/Authentication.js";
import { orderController,changeOrderStatus,userOrderHistory,getAll,getAllOrders ,getTheinformation, verify_payemt_order } from "../controllers/order.contoller.js";
const orderRouter = Router()

orderRouter.post('/place', requireAuth, orderController)
orderRouter.put('/status/:orderId/:status', requireAdmin, changeOrderStatus)
orderRouter.get('/history', requireAuth, userOrderHistory)
orderRouter.get('/rest',requireAdmin,getAll)
orderRouter.get('/all',requireAdmin,getAllOrders)
orderRouter.get('/info',requireAdmin,getTheinformation)
orderRouter.post('/verify',requireAuth,verify_payemt_order)
export default orderRouter