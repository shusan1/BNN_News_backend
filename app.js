require('./database/connection');
const router = require("./routes/auth");
const express = require("express");

var app = express();

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", router);

const PORT = 7777;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
