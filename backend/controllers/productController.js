const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


// Create Product  --Admin
exports.createProduct = catchAsyncErrors(async (req,res,next) => {

    req.body.user = req.user.id

    let product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async(req,res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    let products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        console.log("hi")
        return next(new ErrorHandler("Product Not Found", 404));       //res.status(404).json({success: false, message: "Product Not Found"})
            
    }


    res.status(200).json({
        success: true,
        product,

    })
});

// Update Product  --Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
    
});

// DELETE Product  --Admin
exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {
    const result = await Product.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
});