import { Options, Sequelize } from "sequelize";

const env: string = process.env.NODE_ENV || "development";
const dbconf: Options = require("../db/config")[env]

export const sequelize = new Sequelize(
  dbconf.database || "",
  dbconf.username || "",
  dbconf.password || "",
  dbconf
)