const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

// Import routes
const userRoutes = require("./src/routes/user.routes");
const categoryRoutes = require("./src/routes/category.routes");
const productRoutes = require("./src/routes/product.routes");
const reviewsRoutes = require("./src/routes/reviews.routes");
const cartRoutes = require("./src/routes/cart.route");
const orderRoutes = require("./src/routes/order.route");

// Initialize Express app
const app = express();

// Configure environment variables
env.config();

// Note: you have create your own MongoDB Database
// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@ecommerce-store.qpikxd2.mongodb.net/${process.env.MONGO_DB_PASSWORD}?retryWrites=true&w=majority`
   
  )

  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/healthCheck", (req, res) => {
  res.send("ok");  //dev pulse studio
});

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", reviewsRoutes);
app.use("/api", cartRoutes)
app.use("/api", orderRoutes)
// Start server
app.listen(process.env.PORT, () => {
  console.log(`Your server is running on port ${process.env.PORT}`);
});
