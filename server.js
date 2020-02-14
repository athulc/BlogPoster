const express = require("express");
const moongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

//Routes
const Api = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

moongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/Poster", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.log("Error:" + err));

//Http request logger
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", Api);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`Server is running at port:${PORT}`));
