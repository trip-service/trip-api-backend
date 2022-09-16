module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "tags",
      [
        {
          name: "運動",
        },
        {
          name: "溫泉",
        },
        {
          name: "景點",
        },
        {
          name: "休閒",
        },
        {
          name: "球類運動",
        },
        {
          name: "漫畫相關景點",
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("tags", null, {}),
};
