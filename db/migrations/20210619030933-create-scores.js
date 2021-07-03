'use strict';

/** @type {{up: (queryInterface: import("sequelize").QueryInterface, Sequelize: import("sequelize")) => void, down: (queryInterface: import("sequelize").QueryInterface, Sequelize: import("sequelize")) => void}} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Scores', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.TEXT,
        defaultValue: ""
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Scores');
  }
};
