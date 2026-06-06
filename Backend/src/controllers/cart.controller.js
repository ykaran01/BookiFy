import { ApiError } from "../utilities/apiError.js"
import ApiResponse from "../utilities/apiResponse.js"
import cartModule from "../modules/cart.modules.js"
import { asyncHandeler } from "../utilities/asyncHandler.js"
import productModules from "../modules/product.modules.js"

const getCart = asyncHandeler(async (req, res) => {
    const userId = req.user;
    let cart = await cartModule
        .findOne({ user: userId })
        .populate("items.product");
    if (!cart) {
        cart = await cartModule.create({
            user: userId,
            items: [],
            totalPrice: 0
        });
    }

    res.status(200).json(
        new ApiResponse(200, cart, "Cart retrieved successfully")
    );
});

const putElementincart = asyncHandeler(async (req, res) => {
    const { items, totalPrice } = req.body;

    const cart = await cartModule.findOne({
        user: req.user
    });

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }

    cart.items = items;
    cart.totalPrice = totalPrice;

    await cart.save();

    res.status(200).json({
        success: true,
        cart
    });
});

export { getCart, putElementincart }