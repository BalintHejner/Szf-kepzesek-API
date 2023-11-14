const express = require("express");
const trainings = require("./routes/trainings");

require("dotenv").config(); // A .env fájlt olvassa
const app = express();
const morgan = require("morgan");

app.use(morgan('dev'));

app.use("/api/trainings", trainings);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

app.get("/", (req, res) => {
  res.status(400).json({ success: false });
});
