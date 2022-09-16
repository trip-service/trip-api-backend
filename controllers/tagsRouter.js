const express = require("express");

const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { getAllTags } = require("../services/tagsServices");

const router = express.Router();

/**
 * @typedef TagsResponse
 * @property {integer} id.required
 * @property {string} name.required
 */

/**
 *
 * Tag Router.
 * @group tags
 * @route GET /tags
 * @returns {TagsResponse[]} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @security none
 * @typedef TagsResponse[]
 * @property {{integer}} code - response code - eg: 200
 */
router.get("/", async (req, res) => {
  try {
    const data = await getAllTags();

    return responseOk(res, data);
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
