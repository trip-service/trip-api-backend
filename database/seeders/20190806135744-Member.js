module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "members",
      [
        {
          email: "janedoe1@example.com",
          name: "janedoe1",
        },
        {
          email: "jondoe2@example.com",
          name: "jondoe2",
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("members", null, {}),
};
