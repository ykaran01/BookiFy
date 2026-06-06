import Apiresponse from "../utilities/apiResponse.js";
import { asyncHandeler } from "../utilities/asyncHandler.js";
import productModule from "../modules/product.modules.js";
import { categoryModule } from "../modules/category.modules.js";
import { ApiError } from "../utilities/apiError.js";
import uploadOnCloudnary from "../utilities/cloundnary.js";
export const createCategory = asyncHandeler(async (req, res) => {
    const { name } = req.body;
    if (!name) throw new ApiError(400, "Category name is required");

    const existing = await categoryModule.findOne({ name });
    if (existing) throw new ApiError(400, "Category already exists");

    const category = await categoryModule.create({ name: name });
    res.status(201).json(new Apiresponse(201, category, "Category created"));
});
export const getAllCategories = asyncHandeler(async (req, res) => {
    const categories = await categoryModule.find();
    res.status(200).json(new Apiresponse(200, categories, "Fetched all categories"));
});
export const addProducts = asyncHandeler(async (req, res) => {
    const file = req.file?.path;
    const { name, description, price, quantity, category, author } = req.body;

    if (!file || !name || !price || !description || !quantity || !category) {
        throw new ApiError(400, 'Missing required fields or file');
    }
    
    
    const uploader = await uploadOnCloudnary(file);
    
    const product = await productModule.create({
        name,
        description,
        price,
        quantity,
        image: uploader.url,
        category,
        author: author || "unknown"
    });
    
    res.status(201).json(new Apiresponse(201, product, 'Product created successfully'));
});
export const getProductsByCategory = asyncHandeler(async (req, res) => {
    const { categoryId } = req.params;
    const products = await productModule.find({ category: categoryId }).populate('category');
    res.status(200).json(new Apiresponse(200, products, 'Fetched products by category'));
});
export const searchProducts = asyncHandeler(async (req, res) => {
    const { query, category } = req.query;
    let filter = {};
    if (query && query!="null") {
        filter.$or = [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
           
        ];
    }
   
    if (category && category != 'null') {
        filter.category = category
    };
    
    const products = await productModule.find(filter).populate('category');
    
    res.status(200).json(new Apiresponse(200, products, 'Search results'));
});
export const getProductById = asyncHandeler(async (req, res) => {
    const product = await productModule.findById(req.params.id).populate('category');
    if (!product) throw new ApiError(404, 'Product Not Found');
    res.status(200).json(new Apiresponse(200, product, 'Product fetched'));
});

export const deleteProduct = asyncHandeler(async (req, res) => {
    const product = await productModule.findOneAndDelete({ _id: req.params.id });
    if (!product) throw new ApiError(404, 'Product Not Found or Unauthorized');
    res.status(200).json(new Apiresponse(200, product, 'Product deleted'));
});
export const updateProduct = asyncHandeler(async (req, res) => {
    const { name, description, price, quantity ,author} = req.body;
    let updateData = {};
    if (name) {
        updateData.name = name;
    }
    if (description) {
        updateData.description = description;
    }
    if (price) {
        updateData.price = Number(price);
    }
    if (quantity) {
        updateData.quantity = Number(quantity);
    }
    if(author){
        updateData.author = author
    }
    const product = await productModule.findOneAndUpdate(
        { _id: req.params.id },
        updateData,
    );
    if (!product) throw new ApiError(404, 'Product Not Found or Unauthorized');
    res.status(200).json(new Apiresponse(200, null, 'Product updated'));
}
);

export const changeQuantity = asyncHandeler(async (req, res) => {
    const { products } = req.body;
    for (const item of products) {
        const qty = Number(item.quantity);

        let updateQuery = {
            $inc: {
                quantity: item.change ? qty : -qty
            }
        };
        await productModule.findByIdAndUpdate(item._id, updateQuery);
    }
    res.json(
        new Apiresponse(200, null, "Quantity updated")
    );
});
export const getAllProducts = asyncHandeler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const products = await productModule.find()
        .skip((page - 1) * limit)
        .limit(Number(limit)).populate("category");

    res.status(200).json(new Apiresponse(200, products, 'Fetched all products'));
}
);

export const deleteCategory = asyncHandeler(async (req, res) => {
    const category = await categoryModule.findOneAndDelete({ name: req.params.name })
    if (!category) {
        throw new ApiError(404, "Category Not Found")
    }
    res.status(200).json(
        new Apiresponse(200, category, 'category deleted succesfully')
    )
})

