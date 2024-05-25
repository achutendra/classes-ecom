module.exports = (catchAsyncErrors) => (req, res, next) => {
    console.log("1")
    Promise.resolve(catchAsyncErrors(req, res, next)).catch(next);
}