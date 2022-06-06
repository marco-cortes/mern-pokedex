const express = require("express");
const db = require("./database");
const cors = require('cors');
require("dotenv").config();

console.log(process.env.PORT);

const app = express();

app.use(cors());

db();

app.use(express.static("public"));
app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/pokemon", require("./routes/pokemon"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

