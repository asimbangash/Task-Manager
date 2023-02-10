const express = require("express");
const app = express();
const tasks  = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// const cors = require('cors');

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('./public'));
app.use(express.json());
// app.use(cors());
// route
app.use("/api/v1",tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async(req, res)=>{
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log(`server is runnig at port number ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();