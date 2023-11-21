const express = require("express");
const trainings = require("./routes/trainings");

require("dotenv").config(); // A .env fájlt olvassa
const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
 console.log(error);
});
database.once("connected", () => {
 console.log(`Database Connected ${database.host}`);
});

const morgan = require("morgan");
app.use(morgan('dev'));

app.use("/api/trainings", trainings);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

app.get("/", (req, res) => {
  res.status(400).json({ success: false });
});
