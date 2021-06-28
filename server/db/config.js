const parse = require("pg-connection-string").parse;
const info = parse(process.env.DATABASE_URL || "");

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "db",
    dialect: "postgres"
  },
  production: {
    username: info.user,
    password: info.password,
    database: info.database,
    host: info.host,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
