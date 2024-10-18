const mongoose = require("mongoose");
const { Schema } = mongoose;

//  MarketItem as an embedded subdocument schema
const MarketItemSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

//  MarketList as a separate schema
const MarketListSchema = new Schema({
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the list was created
  items: [MarketItemSchema], // Array of MarketItems
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
});

//  User schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  marketLists: [MarketListSchema], // Array of MarketLists
});

// Create and export the User model
const User = mongoose.model("Muser", UserSchema);
module.exports = User;
