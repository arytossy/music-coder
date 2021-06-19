'use strict';

const uuid = require("uuid");

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
      key: "D- Major",
      data: "[D-add9]よっ\nと[D-M7/F]ほっ\nと[G-sus4]うんと[B-7/D]すんと\nの[E-m]どっこら[A-7-5/D]しょー\nからの[D-]Yeah★",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Scores', null, {});
  }
};
