const express = require("express");
require("dotenv").config(); // A .env fájlt olvassa
const app = express();
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

app.get('/', (req, res) => {
     res.status(400).json({ success: false})
    })
    
const trainings = require('./routes/trainings')
app.use('/api/trainings', trainings)
    