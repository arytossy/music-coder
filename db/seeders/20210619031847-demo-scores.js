'use strict';

const uuid = require("uuid");

/** @type {{up: (queryInterface: import("sequelize").QueryInterface, Sequelize: import("sequelize")) => void, down: (queryInterface: import("sequelize").QueryInterface, Sequelize: import("sequelize")) => void}} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Scores', [{
      id: uuid.v4(),
      title: "hoge",
      key: "C Major",
      data: "[C]ほげー[F]ほげー\n[G7]よっこら[C]せー",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid.v4(),
      title: "fuga",
      key: "A minor",
      data: "[Am]ふが[Am7/G]ふが\n[Dm/F]ふーが[E7]FUGA!\nからの[Am]ほい",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid.v4(),
      title: "ていやっ",
      key: "-D Major",
      data: "[-Dadd9]よっ\nと[-DM7/F]ほっ\nと[-Gsus4]うんと[-B7/D]すんと\nの[-Em]どっこら[-A7-5/D]しょー\nからの[-D]Yeah★",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Scores', {where: null}, {});
  }
};
