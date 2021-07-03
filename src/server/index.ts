import path from "path";
import express from "express";
import { scores } from "./controllers/ScoreController";

const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.route("/api/scores")
  .get((req, res) => scores.index(res))
  .post((req, res) => scores.create(req.body, res))
;

app.route("/api/scores/:id")
  .get((req, res) => scores.show(req.params.id, res))
  .put((req, res) => scores.update(req.params.id, req.body, res))
  .delete((req, res) => scores.destroy(req.params.id, res))
;

app.use("/dist", express.static(path.resolve(process.cwd(), "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "client/index.html"));
});

app.listen(port, () => {
  console.log(`Express server listening at port ${port} ...`);
});