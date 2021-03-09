const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(require("./routes"));

//this line actually tells mongoose what db we are connecting to. the first option is used if the variable MONGODB_URI exists in the
//env variables for a deploying app like Heroku, the second is used if env variables are not available
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
