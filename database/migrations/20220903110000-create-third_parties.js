'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('third_parties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "members",
          key: "id",
        },
      },
      type: {
        type: Sequelize.STRING,
        status: {
          type: Sequelize.ENUM("google"),
        },
      },
      notification_token: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('third_parties');
  }
};
