const database = require("../database/models");
const pick = require("lodash/pick");
const isEmpty = require("lodash/isEmpty");

const signInOrSignUpGoogleUser = async (userInfo) => {
  const memberResult = await database.Member.findOne({
    attributes: ["id"],
    where: {
      email: userInfo.email,
    },
  });

  if (isEmpty(memberResult)) {
    await database.sequelize.transaction(async (t) => {

      const createMemberResult = await database.Member.create({
        email: userInfo.email,
        name: userInfo.name,
      });

      await database.ThirdParty.create({
        type: "google",
        referenceId: userInfo.id,
        memberId: createMemberResult.id,
      });
    });
  }

  return await database.Member.findOne({
    attributes: ["id", "name", "email", "createdAt"],
    where: {email: userInfo.email},
  })
};

const parseUserResponse = (memberResult) => {
  const userResponse = pick(memberResult, [
    "id",
    "phone",
    "email",
    "createAt",
  ]);
  return userResponse;
};


module.exports.parseUserResponse = parseUserResponse;
module.exports.signInOrSignUpGoogleUser = signInOrSignUpGoogleUser;
