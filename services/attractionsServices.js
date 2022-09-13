const database = require("../database/models");

const getAllCities = async () =>
  database.Attraction.findAll({
    attributes: ["id", "name"],
  });

module.exports = {
  getAllCities,
};
