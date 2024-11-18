const express = require('express');
const cors = require('cors');
const passport = require('passport')
const session = require('express-session')
const connectDB = require("./config/Database");
require('dotenv').config();
require("./config/passport")(passport);
const authRoutes = require('./routes/authRoutes')

const app = express();
const port = process.env.PORT || 5500;

connectDB();
app.use(cors());
app.use(express.json());

app.use(
  session({ secret: "SESSION_SECRET", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Add your routes here

app.get("/" ,(req,res) => {
    res.send("Educamp Quiz Platform");
})

app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`Server is running successfully on http://localhost:${port}`);
});