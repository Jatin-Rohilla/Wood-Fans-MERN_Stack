const express = require("express");
const { userController } = require("./controllers/UserController");
const { connection } = require("./configs/db");
const cors = require("cors");
const { authorization } = require("./middleware/authorization");
const { productsController } = require("./controllers/ProductsController");
const { cartController } = require("./controllers/CartController");
const { AdminController } = require("./controllers/AdminController");
const { SellerController } = require("./controllers/SellerController");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("admin"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ massege: "Server is working" });
});

app.use("/user", userController);
app.use("/products", productsController);
app.use("/cart", cartController);
app.use("/admin", AdminController);
app.use("/seller", SellerController);

app.get(
  "/protected",
  authorization(["buyer", "admin", "seller"]),
  (req, res) => {
    res.json({ message: "good" });
  }
);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB successfully");
  } catch (error) {
    console.log("error while connection to DB");
    console.log(error);
  }
  console.log(`Server is running at port ${PORT}`);
});
