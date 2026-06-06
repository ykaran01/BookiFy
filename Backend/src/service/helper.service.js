import productModules from "../modules/product.modules.js"

const checking = async (items) => {
    try {
        for (const item of items) {
            const product = await productModules.findById(item.product);
            if (!product || item.quantity > product.quantity) {
                return false;
            }
        }
        return true;
    } catch (err) {
        throw new Error(err.message)
    }


}

const changeInDb = async (items) => {
    try {
        for (const item of items) {
           
            const product = await productModules.findByIdAndUpdate(
                item.product, 
                { $inc: { quantity: -item.quantity } },
                { new: true } 
            );

            if (!product) {
                throw new Error('product not found');
            }
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

export { checking, changeInDb }