const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const blogRoute = require("./Routes/AuthRoute");
const { MONGO_URL,PORT, CORS_URL } = process.env;



mongoose
.connect(MONGO_URL)
.then(() => console.log("MongoDB is  connected successfully"))
.catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

console.log(CORS_URL)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
  );
  app.use(cookieParser());
  
  app.use(express.json());
  
  app.use("/", authRoute);
  app.use("/", blogRoute);
  app.use('/uploads', express.static('uploads'));

