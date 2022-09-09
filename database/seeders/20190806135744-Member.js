module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "members",
      [
        {
          email: "janedoe@example.com",
          name: "janedoe",
        },
        {
          email: "tommy@example.com",
          name: "tommy",
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("members", null, {}),
};
