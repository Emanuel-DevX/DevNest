const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.get("/",(req, res)=>{
    res.send("Welcome to DevNest")
})

app.listen(PORT, () => {
  console.log(`All good server is running on ${API_URL}`);
});
