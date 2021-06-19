const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
    res.json({message:"Welcome to API!"});
  });

app.use("/dist", express.static(path.resolve(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/index.html"))
})

app.listen(port);