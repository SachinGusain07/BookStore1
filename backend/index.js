const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const conn = require("./conn/conn");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cookieParser = require("cookie-parser");
const favouritesRoutes = require("./routes/favouritesRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/assets", express.static(path.join(__dirname, "asset")));

app.use(express.json());

//middleware
app.use("/api/v1", userRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", favouritesRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  conn();
  console.log(`Example app listening on port ${port}`);
});
