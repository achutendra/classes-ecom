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

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    console.log("okay", product);
    console.log(product.reviews);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    console.log(isReviewed);

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }   
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });


});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    console.log(product);
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
    const numOfReviews = reviews.length;
    let ratings = 0;
    reviews.forEach((rev) => {
        ratings += rev.rating;
    });
    let avg = 0;
    if (numOfReviews > 0) {
        avg = ratings / numOfReviews;
    }


    const updatedProduct = await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings: avg,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }
    );
    res.status(200).json({
        success: true,
    });
});
 