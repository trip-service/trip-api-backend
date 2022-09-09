const express = require("express");

const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { getAttractionsData } = require("../services/attractionsServices");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAttractionsData();
    console.log(
      "🚀 ~ file: attractionsRouter.js ~ line 11 ~ router.post ~ data",
      data
    );

    return responseOk(res, { success: true });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
