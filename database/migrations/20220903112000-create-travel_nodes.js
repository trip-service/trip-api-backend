'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('travel_nodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      travel_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "travels",
          key: "id",
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.JSON,
      },
      start_at_time: {
        type: Sequelize.DATE,
        length: 4,
      },
      duration: {
        type: Sequelize.INTEGER,
        length: 4,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('travel_nodes');
  }
};