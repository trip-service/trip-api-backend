const database = require("../database/models");

const getTravelByIdResult = async (travelId) => database.Travel.findOne(
  {
    id: travelId,
  }
);

const createTravelResult = async (body) => {
  const createdResult = await database.Travel.create({
    title: body.title,
  });

  return await getTravelByIdResult(createdResult.id);
}


module.exports = {
  createTravelResult,
};
