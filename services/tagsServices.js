const database = require("../database/models");

const getAllTags = async () =>
  database.Tag.findAll({
    attributes: ["id", "name"],
  });

module.exports = {
  getAllTags,
};
