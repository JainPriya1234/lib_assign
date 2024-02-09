const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");
const notFound = require("./errors/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const router = require("./routes");


const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Load environment variables
dotenv.config();

// Create Express server
const app = express();


//public 
app.use('/public',express.static('public'))


// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// CORS configuration
app.use(cors(corsOptions));
app.options("*", cors);


app.use(router);

// Error handling
app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT,()=>{
    logger.info("App is running at http://localhost:%d ",process.env.PORT);
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

// Shutdown express server gracefully.

function shutDown() {
    logger.info("Received kill signal, shutting down gracefully");
    server.close(() => {
        console.log("Closed out remaining connections");
        process.exit(0);
    });
}

module.exports = app;
