const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
  cart: { type: Array },
  userId: { type: mongoose.Types.ObjectId, required: true },
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
