'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('travel_node_links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      travel_node_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "travel_nodes",
          key: "id",
        },
      },
      url: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
      },
      key_words: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      get_json: {
        type: Sequelize.JSON,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('travel_node_links');
  }
};