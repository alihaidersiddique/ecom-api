const mongoose = require("mongoose");

const product = mongoose.model(
  "product",
  mongoose.Schema(
    {
      productName: String,
      productDescription: String,
      productPrice: Number,
      productImage: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { product };
