const database = require("../database/models");
const isEmpty = require("lodash/isEmpty");
const isNull = require("lodash/isNull");
const { Op } = require("sequelize");

const getTravelByIdResult = async (travelId) => {
  const travelResult = await database.Travel.findOne({
    include: [
      {
        as: "city",
        model: database.Attraction,
        attributes: ["id", "name"],
      },
      {
        as: "tags",
        model: database.Tag,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "title", "startAt", "endAt", "description"],
    where: {
      id: travelId,
    },
  });

  return travelResult;
};

const getTravelsResult = async (body) => {
  const { keyword, page, limit } = body;

  const offset = (page - 1) * limit;
  const whereCondition = {
    "$member.id$": 1,
  };

  if (!isEmpty(keyword)) {
    whereCondition.title = {
      [Op.like]: `%${keyword}%`,
    };
  }

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
    where: whereCondition,
  });

  return {
    count: travelsResult.count,
    rows: travelsResult.rows.map((travel) => {
      const { member, ...travelObject } = travel.toJSON();
      return travelObject;
    }),
  };
};

const createTravelResult = async (body) => {
  const createdResult = await database.Travel.create({
    title: body.title,
    memberId: 1,
  });
};

const removeTravelsUnitestResult = async () =>
  database.Travel.destroy({
    where: { title: "unitest 旅程標題" },
  });

const getReduceTags = (targetTags, sourceTagIds) => {
  if (isEmpty(targetTags)) {
    return { newTags: sourceTagIds, loseTags: [] };
  }
  const targetTagIds = targetTags.map((tag) => tag.id);

  const newTags = sourceTagIds.filter((tagId) => {
    console.log(
      "🚀 ~ file: travelServices.js ~ line 97 ~ newTags ~ targetTagIds",
      targetTagIds
    );
    return !targetTagIds.includes(tagId);
  });
  const loseTags = targetTagIds.filter(
    (tagId) => !sourceTagIds.includes(tagId)
  );
  return { newTags, loseTags };
};

const updateTravelResult = async (travelId, body) => {
  const travelIdResult = await database.Travel.findOne({
    include: [{ as: "tags", model: database.Tag, attributes: ["id"] }],
    attributes: ["id"],
    where: { id: travelId },
  });

  if (isEmpty(travelIdResult)) {
    throw new Error("資料不存在");
  }

  const whereCondition = {};
  if (!isEmpty(body.title)) {
    whereCondition.title = body.title;
  }
  if (!isEmpty(body.startAt)) {
    whereCondition.startAt = body.startAt;
  }
  if (!isEmpty(body.endAt)) {
    whereCondition.endAt = body.endAt;
  }

  if (!isEmpty(body.description)) {
    whereCondition.description = body.description;
  }

  if (!isNull(body.cityId)) {
    whereCondition.attractionId = body.cityId;
  }

  const { newTags, loseTags } = getReduceTags(travelIdResult.tags, body.tagIds);

  await database.sequelize.transaction(async (t) => {
    await database.Travel.update(
      whereCondition,
      { where: { id: travelId } },
      { transaction: t }
    );

    await database.TravelTagMapping.bulkCreate(
      newTags.map((tagId) => ({ tagId, travelId: travelIdResult.id }), {
        transaction: t,
      })
    );

    await database.TravelTagMapping.destroy(
      {
        where: {
          [Op.or]: loseTags.map((tagId) => ({
            tagId,
            travelId: travelIdResult.id,
          })),
        },
      },
      { transaction: t }
    );
  });
  return await getTravelByIdResult(travelId);
};

module.exports = {
  getTravelsResult,
  updateTravelResult,
  createTravelResult,
  removeTravelsUnitestResult,
};
