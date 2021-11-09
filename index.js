const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;


app.get('/', (req,res) => {
    res.send("HOUSEPLANT Server is running")
})

app.listen(port, ()=> {
    console.log("server is running on port:", port);
})