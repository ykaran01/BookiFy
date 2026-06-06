import { ApiError } from "../utilities/apiError.js";
import ApiResponse from "../utilities/apiResponse.js";
import cartModule from "../modules/cart.modules.js";
import { asyncHandeler } from "../utilities/asyncHandler.js";
import { orderModel } from "../modules/order.module.js";
import Apiresponse from "../utilities/apiResponse.js";
import { createAddress } from "../service/address.service.js";
import { checking, changeInDb } from "../service/helper.service.js";
import { clerkClient, createClerkClient } from "@clerk/express";
import { sendMail } from "../service/email.service.js";
 const  clerk = await createClerkClient({secretKey:process.env.CLERK_SECRET_KEY})  
const orderController = asyncHandeler(async (req, res) => {
    const userId = req.user;
    const { shippingAddress, phoneNumber } = req.body;
    const cart = await cartModule.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    if (cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }
    
    const isAvailable = await checking(cart.items);
    if (!isAvailable) {
        throw new ApiError(400, "Some products are not available in the requested quantity");
    }
    const shippingAddressDoc = await createAddress({
        ...shippingAddress,
        user: userId,
    });
     
    const user = await clerk.users.getUser(userId);
   
    const order = await orderModel.create({
        user: userId,
        username: user.fullName,
        item: cart.items,
        totalPrice: cart.totalPrice,
        shippingAddress: shippingAddressDoc,
        phoneNumber: Number(phoneNumber),
        orderStatus: "pending",
    });
    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    await changeInDb(order.item);
    sendMail({OrderStatus:order.orderStatus,email:user.emailAddresses[0].emailAddress})

    return res.status(201).json(
        new ApiResponse(201, order, "Order placed successfully")
    );
});
const changeOrderStatus = asyncHandeler(async (req, res) => {
    const { orderId, status } = req.params;
    const validStatus = ["pending", "confirmed", "delivered", "cancelled"];

    if (!validStatus.includes(status)) {
        throw new ApiError(400, "Invalid order status");
    }

    const order = await orderModel.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
       

    );
    const user = await clerk.users.getUser(order.user);
    sendMail({OrderStatus:order.orderStatus,email:user.emailAddresses[0].emailAddress})

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    res.status(200).json(
        new ApiResponse(200, order, "Order status updated successfully")
    );
});


const userOrderHistory = asyncHandeler(async (req, res) => {
    const userId = req.user
    const orders = await orderModel.find({ user: userId }).populate("item.product").select("-shippingAddress -shippingFee -phoneNumber -_id");
    res.status(200).json(
        new ApiResponse(200, orders, "User order history fetched")
    );
})

const getAllOrders = asyncHandeler(async (req, res) => {
    const orders = await orderModel.find({ orderStatus: { $in: ["pending", "confirmed",] } });
    if (!orders) {
        throw new ApiError(404, "order Not Found");
    }
    res.status(200).json(new Apiresponse(200, orders, "All data Got fetched"))
})

const getAll = asyncHandeler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const orders = await orderModel.find().select("-shippingFee -user -item.product -phoneNumber -shippingAddress").skip((page-1)*limit || 0).limit(limit || 10).sort({ createdAt: -1 });

    if (orders.length == 0) {
        throw new ApiError(404, "Orders Not found");
    }
    res.status(200).json(new ApiResponse(200, orders, "All Data of orders"))
})

const getTheinformation = asyncHandeler(async (req, res) => {
    const totalOrders = await orderModel.countDocuments();
    const confirmedOrders = await orderModel.countDocuments({ orderStatus: "confirmed" });
    const cancelledOrders = await orderModel.countDocuments({ orderStatus: "cancelled" });
    const deliveredOrders = await orderModel.countDocuments({ orderStatus: "delivered" });
    const pendingOrders = await orderModel.countDocuments({ orderStatus: "pending" });

    res.status(200).json(
        new ApiResponse(200, { totalOrders, confirmedOrders, cancelledOrders, deliveredOrders, pendingOrders }, "Order information fetched")
    );
});

export {
    orderController,
    changeOrderStatus,
    userOrderHistory,
    getAllOrders,
    getAll,
    getTheinformation
};