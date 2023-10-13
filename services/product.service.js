const { product } = require("../models/product.model");

async function createProduct(params, callback) {
  if (!params.productName) {
    return callback(
      {
        message: "Product name is required",
      },
      ""
    );
  }

  const newProduct = product(params);

  newProduct
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getProducts(params, callback) {
  const productName = params.productName;

  var condition = productName
    ? {
        productName: { $regex: new RegExp(productName), $options: "i" },
      }
    : {};

  productName
    .find(condition)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = { createProduct, getProducts };
