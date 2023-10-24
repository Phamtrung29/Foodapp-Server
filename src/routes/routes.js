const productRoute = require("./productsRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const authRoute = require("./auth");
const cartRoute = require("./cartRoute");

const initRoute = (app) => {
  app.use("/products", productRoute);
  app.use("/users", userRoute);
  app.use("/order", orderRoute);
  app.use("/auth", authRoute);
  app.use("/cart", cartRoute);
};

module.exports = initRoute;
