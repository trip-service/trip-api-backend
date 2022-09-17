const yup = require("yup");
const express = require("express");
const { responseOk, responseErrWithMsg } = require( "../helpers/response" );
const { getTravelsResult, createTravelResult, updateTravelResult } = require( "../services/travelServices" );
const router = express.Router();

const createTravelRequestSchema = yup.object({
  title: yup.string().required("旅遊抬頭不可為空"),
});

const updateTravelRequestSchema = yup.object({
  title: yup.string().nullable().default(null),
  startAt: yup.date().nullable().default(null),
  endAt: yup.date().nullable().default(null),
  description: yup.string().nullable().default(null),
  cityId: yup.number().default(null),
  tagIds: yup.array().of(yup.number()),
});

const getTravelsRequestSchema = yup.object({
  keyword: yup.string().nullable().default(null),
  page: yup.number().default(1),
  limit: yup.number().default(20),
});

/**
 * @typedef UpdateTravelRequest
 * @property {string} title
 *   - 旅程的 Title
 *   - eg: 旅遊的抬頭
 * @property {string} startAt
 *   - 旅程的 開始日期
 *   - eg: 2022-01-01
 * @property {string} endAt
 *   - 旅程的 結束日期
 *   - eg: 2022-01-07
 * @property {string} description
 *   - 旅程的 內容
 *   - eg: 旅遊的描述內容
 * @property {string} cityId
 *   - 旅遊目標的城市 ID
 *   - eg: 1
 * @property {string} tagIds
 *   - 綁定標籤的 id 陣列
 *   - eg: [1, 2]
 */

/**
 * @typedef UpdateTravelResponse
 * @property {string} id
 *   - 旅程的 ID
 *   - eg: 旅遊的 ID
 * @property {string} title
 *   - 旅程的 Title
 *   - eg: 旅遊的抬頭
 * @property {string} startAt
 *   - 旅程的 開始日期
 *   - eg: 2022-01-01
 * @property {string} endAt
 *   - 旅程的 結束日期
 *   - eg: 2022-01-07
 * @property {string} description
 *   - 旅程的 內容
 *   - eg: 旅遊的描述內容
 * @property {string} cityId
 *   - 旅遊目標的城市 ID
 *   - eg: 1
 * @property {string} tagIds
 *   - 綁定標籤的 id 陣列
 *   - eg: [1, 2]
 */

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
  responseOk(res, travelsResult);
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

/**
 * Travel Router.
 * @group Travel
 * @route PUT /travels/{travelId}
 * @param {string} travelId.path.required - travel 的 ID
 * @param {UpdateTravelRequest.model} data.body.required - the new point
 * @returns {UpdateTravelResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @security none
 * @typedef UpdateTravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
 router.put('/:travelId', async (req, res) => {
  try {
    const {travelId: travelIdString} = req.params;
    const travelId = Number(travelIdString);
    const validation = await updateTravelRequestSchema.validate(req.body);

    const result = await updateTravelResult(travelId, validation);
    responseOk(res, result);
  }catch(error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
