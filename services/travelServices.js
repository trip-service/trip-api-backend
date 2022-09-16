const database = require("../database/models");

const getTravelByIdResult = async (travelId) =>
  database.Travel.findOne({
    where: {
      id: travelId,
    },
  });

const createTravelResult = async (body) => {
  const createdResult = await database.Travel.create({
    title: body.title,
  });

  return await getTravelByIdResult(createdResult.id);
};

const removeTravelsUnitestResult = async () =>
  database.Travel.destroy({
    where: { title: "unitest 旅程標題" },
  });

module.exports = {
  createTravelResult,
  removeTravelsUnitestResult,
};
