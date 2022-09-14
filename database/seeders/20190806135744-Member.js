module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "members",
      [
        {
          email: "janedoe@example.com",
        },
        {
          email: "jondoe@example.com",
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("members", null, {}),
};
