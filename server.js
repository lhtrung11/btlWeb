//dotenv
require("dotenv").config();

// Connect DB
const { connectDB } = require("./configs/db");
connectDB();

const express = require("express");
const cors = require("cors");

const route = require("./routers");

const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

//Routing
route(app);

app.use(errorHandler);

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
