const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

// // Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

// Configure environment variables
dotenv.config({path:"backend/config/.env"});

// Connect to database
connectDB();



app.listen(process.env.PORT, ()=>{
    console.log((`server is working on http://localhost:${process.env.PORT}`));
})


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });

})