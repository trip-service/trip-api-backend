const yup = require("yup");
const express = require("express");
const { responseOk } = require( "../helpers/response" );
const { createTravelResult } = require( "../services/travelServices" );
const router = express.Router();


const createTravelRequestSchema = yup.object({
  title: yup.string().required("旅遊抬頭不可為空"),
});

/**
 * @typedef TravelRequest
 * @property {string} title.required
 *   - 旅程的 Title
 *   - eg: 旅遊的抬頭
 */

/**
 * @typedef TravelResponse
 * @property {[string]} title.required - example title name
 */

/**
 * Travel Router.
 * @group Travel
 * @route GET /travels
 * @returns {TravelResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @security none
 * @typedef TravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
router.get('/', function(req, res) {
  res.json([]);
});



/**
 * Travel Router.
 * @group Travel
 * @route POST /travels
 * @param {TravelRequest.model} data.body.required - the new point
 * @returns {TravelResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @security none
 * @typedef TravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
 router.post('/', async (req, res) => {
  const validation = await createTravelRequestSchema.validate(req.body);
  await createTravelResult(validation);
  responseOk(res, {});
});

module.exports = router;
