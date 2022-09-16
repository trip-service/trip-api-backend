const database = require("../database/models");

const getTravelByIdResult = async (travelId) =>
  database.Travel.findOne({
    where: {
      id: travelId,
    },
  });

const getTravelsResult = async (body) => {
  const { page, limit } = body;
  const offset = (page - 1) * limit;
  const travelsResult = await database.Travel.findAndCountAll({
    include: [
      {
        as: "city",
        model: database.Attraction,
        attributes: ["id", "name"],
      },
      {
        as: "member",
        model: database.Member,
        attributes: ["id"],
        required: true,
      },
      {
        as: "tags",
        model: database.Tag,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "title", "startAt", "endAt", "description"],
    limit,
    offset,
    where: {
      "$member.id$": 1,
    },
  });

  return {
    count: travelsResult.count,
    rows: travelsResult.rows.map((travel) => {
      const {member, ...travelObject} = travel.toJSON();
      return travelObject;
    }),
  };
};

const createTravelResult = async (body) => {
  const createdResult = await database.Travel.create({
    title: body.title,
    memberId: 1,
  });

  return await getTravelByIdResult(createdResult.id);
};

const removeTravelsUnitestResult = async () =>
  database.Travel.destroy({
    where: { title: "unitest 旅程標題" },
  });

module.exports = {
  getTravelsResult,
  createTravelResult,
  removeTravelsUnitestResult,
};
