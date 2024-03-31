const express = require("express");
const { ProductsModel } = require("../models/ProductsModel");

const productsController = express.Router();

productsController.get("/", async (req, res) => {
  try {
    let query = {};

    //filtering option
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Sorting logic
    const sortOptions = {};
    if (req.query.sort) {
      // Assuming sort is a query parameter containing the field to sort by
      sortOptions[req.query.sort] = req.query.order === "desc" ? -1 : 1;
    }

    //Searching logic
    if (req.query.title) {
      // Use a regex for partial matching
      query.title = { $regex: new RegExp(req.query.title, "i") };
    }

    const data = await ProductsModel.find(query).sort(sortOptions);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

productsController.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductsModel.findOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = { productsController };
