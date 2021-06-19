const path = require("path");
const express = require("express");
const { Score } = require("./models");
const app = express();
const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.json({message:"Welcome to API!"});
});

app.get("/api/scores", async (req, res) => {
  const scores = await Score.findAll({attributes: ["id", "title"]});
  res.json(scores);
});

app.route("/api/scores/:id")
  .get( async (req, res) => {
    const score = await Score.findByPk(req.params.id);
    res.json(score.toJSON());
  });

app.use("/dist", express.static(path.resolve(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/index.html"))
})

app.listen(port);