const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL || "");

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "db",
    dialect: "postgres"
  },
  production: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    }
  }
}
