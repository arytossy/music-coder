const path = require("path");
const express = require("express");
const { Score } = require("./models");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.route("/api/scores")
  .get((req, res) => {
    Score.findAll({attributes: ["id", "title"]})
      .then(scores => {
        res.json(scores)
      })
      .catch(e => {
        res.sendStatus(404);
      });
  })
  .post((req, res) => {
    Score.create(req.body)
      .then(newScore => {
        res.status(201).json(newScore.toJSON());
      })
      .catch(e => {
        res.sendStatus(400);
      });
  });

app.route("/api/scores/:id")
  .get((req, res) => {
    Score.findByPk(req.params.id)
     .then(score => {
       res.json(score.toJSON());
     })
     .catch(e => {
       res.sendStatus(404);
     });
  })
  .put((req, res) => {
    Score.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.sendStatus(400);
    });
  })
  .delete((req, res) => {
    Score.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(number => {
      res.sendStatus(204);
    })
    .catch(e => {
      res.sendStatus(404);
    });
  });

app.use("/dist", express.static(path.resolve(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/index.html"))
})

app.listen(port);