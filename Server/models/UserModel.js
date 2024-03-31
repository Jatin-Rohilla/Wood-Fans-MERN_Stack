const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  role: {
    type: String,
    required: true,
    enum: ["admin", "seller", "buyer"],
    default: "buyer",
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
