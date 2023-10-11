const express = require("express");
const mongoose = require("mongoose");
const { MONGO_CONFIG } = require("./config/app.config");
const errors = require("./middlewares/error");

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedToplology: true,
  })
  .then(
    () => {
      console.log("Database Connected!");
    },
    (error) => {
      console.log("Error in connecting Database: " + error);
    }
  );

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(errors.errorHandler);

// routes or endpoints
app.use("/api", require("./routes/app.routes"));

app.listen(process.env.port || 4000, function () {
  console.log("We are connected to server :)");
});
