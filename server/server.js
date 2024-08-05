require("dotenv").config();
const express = require('express');
const router = require("./router/auth-router");
const connectDb = require("./utils/db");


const app = express();

// Middleware is responsible for parsing the jason data from request
app.use(express.json());


app.use("/api/auth", router );

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

