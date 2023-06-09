module.exports = (app) => {
  const products = require("../controllers/product.controller");
  const router = require("express").Router();

  router.get("/", products.findAll);
  router.get("/:code", products.findOne);

  app.use("/api/products", router);
};
