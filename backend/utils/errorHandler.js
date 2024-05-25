class ErrorHandler extends Error{
    constructor(message, statusCode){
        console.log("4")
        super(message);
        this.statusCode = statusCode;
        console.log("5")
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;