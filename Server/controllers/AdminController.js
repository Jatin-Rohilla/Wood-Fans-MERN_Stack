const express = require("express");
const { UserModel } = require("../models/UserModel");
const { authorization } = require("../middleware/authorization");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { CartModel } = require("../models/CartModel");

const AdminController = express.Router();

AdminController.get("/user", authorization(["admin"]), async (req, res) => {
  const data = await UserModel.find();
  res.json({ data: data });
});

AdminController.post(
  "/user/create",
  authorization(["admin"]),
  async (req, res) => {
    const { email, name, password, role } = req.body;

    if (!(email && password && name && role)) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    try {
      const userExist = await UserModel.findOne({ email });

      if (userExist) {
        return res.status(400).json({
          message: "User already exists. Please edit userdetails",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 5);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        name,
        role,
      });

      const cartCreate = await CartModel.create({
        userId: newUser._id,
        cart: [],
      });

      res.json({
        message: "User created successfully",
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

AdminController.patch(
  "/user/update/:id",
  authorization(["admin"]),
  async (req, res) => {
    const id = req.params.id;
    const { password, ...obj } = req.body;
    const userData = await UserModel.findOneAndUpdate({ _id: id }, obj);

    if (userData) {
      res.json({ message: "User data is updated successfully" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  }
);

AdminController.delete(
  "/user/delete/:id",
  authorization(["admin"]),
  async (req, res) => {
    const id = req.params.id;

    const userData = await UserModel.findOneAndDelete({ _id: id });
    const cartData = await CartModel.findOneAndDelete({ userId: id });

    if (userData && cartData) {
      res.json({ message: "User data is deleted successfully" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  }
);

module.exports = { AdminController };
