const express = require("express");
const { authorization } = require("../middleware/authorization");
const { ProductsModel } = require("../models/ProductsModel");

const SellerController = express.Router();

SellerController.get(
  "/products",
  authorization(["seller"]),
  async (req, res) => {
    try {
      const sellerId = req.userId;
      const data = await ProductsModel.find({ sellerId });
      res.send(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

SellerController.post(
  "/products/add",
  authorization(["seller"]),
  async (req, res) => {
    try {
      const sellerId = req.userId;

      const { title, price, image, type } = req.body;

      if (title && price && image && type) {
        const data = await ProductsModel.create({ ...req.body, sellerId });
        res.json({ message: "Product added successfully" });
      } else {
        return res.status(400).json({ message: "please fill all the details" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

SellerController.patch(
  "/products/update/:id",
  authorization(["seller"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const sellerId = req.userId;

      const data = await ProductsModel.findOneAndUpdate(
        { _id: id, sellerId },
        { ...req.body }
      );
      if (data) {
        res.json({ message: "Product updated successfully" });
      } else {
        res.status(400).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

SellerController.delete(
  "/products/delete/:id",
  authorization(["seller"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const sellerId = req.userId;

      const data = await ProductsModel.findOneAndDelete({ _id: id, sellerId });
      if (data) {
        res.json({ message: "Product Deleted successfully" });
      } else {
        res.status(400).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = { SellerController };
