const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter a Product Name"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Please Enter a Product Description"],
    },
    price:{
        type: Number,
        required: [true, "Please Enter a Product Price"],
        maxlength: [6, "Price cannot exceed 6 digits"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type: String,
                required: true
    
            },
            url:{
                type: String,
                required: true
    
            }
        }
    ],
    category:{
        type:String,
        required: [true, "Please Enter a Product Category"],
    },
    stock:{
        type: Number,
        required: [true, "Please Enter a Product Stock"],
        maxlength:[4, "Stock cannot exceed 4 digits"],
        default:1
    },
    numOfReview: {
        type: Number,
        default: 0
    },
    review:[
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);