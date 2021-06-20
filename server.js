const path = require("path");
const express = require("express");
const { Score } = require("./models");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.route("/api/scores")
  .get(async (req, res) => {
    const scores = await Score.findAll({attributes: ["id", "title"]});
    res.json(scores);
  })
  .post(async (req, res) => {
    const newScore = await Score.create(req.body);
    res.json(newScore.toJSON());
  });

app.route("/api/scores/:id")
  .get(async (req, res) => {
    const score = await Score.findByPk(req.params.id);
    res.json(score.toJSON());
  })
  .put(async (req, res) => {
    const result = await Score.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(result);
  });

app.use("/dist", express.static(path.resolve(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/index.html"))
})

app.listen(port);