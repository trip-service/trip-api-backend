const database = require("../database/models");

module.exports.getAllCities = async () => {
  const res = await database.Attraction.findAll({
    attributes: ["id", "name"],
  });

  return res;
};
