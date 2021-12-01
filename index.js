require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const router = require("./routes/index");
const errorHandlingMiddleware = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5002;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/api", router);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // this functionn will check state of DB with your DB schemas
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {}
};
start();
