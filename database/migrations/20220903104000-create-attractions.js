'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        field: "name",
        type: Sequelize.STRING,
        length: 20,
      },
      geoJson: {
        field: "geo_json",
        type: Sequelize.JSON,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attractions');
  }
};