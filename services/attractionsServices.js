const database = require("../database/models");

module.exports.getAttractionsData = async () => {
  try {
    const res = await database.Attraction.findAll();

    return res;
  } catch (error) {
    console.log(
      "🚀 ~ file: attractionsServices.js ~ line 9 ~ module.exports.getAttractionsData= ~ error",
      error
    );
    return [];
  }
};
