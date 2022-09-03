module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'members',
    [
      {
        email: 'janedoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jondoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('members', null, {}),
};