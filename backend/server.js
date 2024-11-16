const express = require('express');
const cors = require('cors');
const connectDB = require("./config/Database");
require('dotenv').config();
const auth = require('./routes/auth')

const app = express();
const port = process.env.PORT || 5500;

connectDB();
app.use(cors());
app.use(express.json());

// Add your routes here

app.get("/" ,(req,res) => {
    res.send("Educamp Quiz Platform");
})

app.use("/api/auth", auth);


app.listen(port, () => {
  console.log(`Server is running successfully on http://localhost:${port}`);
});