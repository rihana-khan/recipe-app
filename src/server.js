const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const recipeRoutes = require("./routings/recipe")
const userRoutes = require("./routings/user")
const db = require('./config/db');
// enabling .env
require("dotenv").config();

const app = express()

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(fileUpload());

// calling db connection
db.makeDb();
// grouping routes
//app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/users", userRoutes);

app.listen(4000)
