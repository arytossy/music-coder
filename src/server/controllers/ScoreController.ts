import { Response } from "express";
import { Score, ScoreCreationAttributes } from "../models/Score";

export const scores: {
  index: (res: Response) => void,
  create: (input: ScoreCreationAttributes, res: Response) => void,
  show: (id: string, res: Response) => void,
  update: (id: string, input: object, res: Response) => void,
  destroy: (id: string, res: Response) => void
} = {

  index(res) {
    Score.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.sendStatus(404);
    })
  },

  create(input, res) {
    Score.create(input)
    .then((result) => {
      res.status(201).json(result.toJSON());
    })
    .catch((error) => {
      res.sendStatus(400);
    })
  },

  show(id, res) {
    Score.findByPk(id)
    .then((result) => {
      result ? res.json(result.toJSON()) : res.sendStatus(404);
    })
    .catch((error) => {
      res.sendStatus(404);
    })
  },

  update(id, input, res) {
    Score.update(input, {where: {id: id}})
    .then(([count, result]) => {
      res.json({count: count, records: result});
    })
    .catch((error) => {
      res.sendStatus(404);
    })
  },

  destroy(id, res) {
    Score.destroy({where: {id: id}})
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.sendStatus(404);
    })
  }
}