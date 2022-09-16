const yup = require("yup");
const express = require("express");
const { responseOk } = require( "../helpers/response" );
const { getTravelsResult, createTravelResult } = require( "../services/travelServices" );
const router = express.Router();

const createTravelRequestSchema = yup.object({
  title: yup.string().required("旅遊抬頭不可為空"),
});

const getTravelsRequestSchema = yup.object({
  keyword: yup.string().nullable().default(null),
  page: yup.number().default(1),
  limit: yup.number().default(20),
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
 * @param {string} keyword.query - 搜尋標題關鍵字
 * @param {string} page.query - 頁數
 * @param {string} limit.query - 每頁幾筆資料
 * @returns {TravelResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @security none
 * @typedef TravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
router.get('/', async (req, res) => {
  const validation = await getTravelsRequestSchema.validate(req.query);
  const travelsResult = await getTravelsResult(validation);
  res.json(travelsResult);
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
