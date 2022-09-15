const express = require("express");

const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { getAllCities } = require("../services/attractionsServices");

const router = express.Router();

/**
 * @typedef CitiesResponse
 * @property {integer} id.required
 * @property {string} name.required
 */

/**
 *
 * Cities Router.
 * @group cities
 * @route GET /cities
 * @returns {CitiesResponse[]} 200 - success, An array of cities info
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @security none
 * @typedef CitiesResponse[]
 * @property {{integer}} code - response code - eg: 200
 */
router.get("/", async (req, res) => {
  try {
    const data = await getAllCities();

    return responseOk(res, data);
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
