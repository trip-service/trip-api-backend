'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('members', {
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
      email: {
        field: "email",
        type: Sequelize.STRING,
        length: 50,
        unique: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('members');
  }
};