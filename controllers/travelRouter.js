const yup = require("yup");
const express = require("express");
const { responseOk, responseErrWithMsg } = require("../helpers/response");
const {
  getTravelsResult,
  getTravelNodesResult,
  createTravelResult,
  updateTravelResult,
  updateTravelNodeDateResult,
  createTravelNodeResult,
} = require("../services/travelServices");
const router = express.Router();

const createTravelRequestSchema = yup.object().shape({
  title: yup.string().required("旅遊抬頭不可為空"),
});

const updateTravelNodeDateRequestSchema = yup.object().shape({
  date: yup.date().required("日期不可為空"),
});

const createTravelNodeRequestSchema = yup.object().shape({
  title: yup.string().required("抬頭不可為空"),
  startAt: yup.date().required("開始時間不可為空"),
  duringTime: yup.number().min(30, "經過的時間必須大於三十分鐘").max(360, "經國的時間必須小於三百六十分鐘").required("經過時間不可為空"),
  description: yup.string().required("抬頭不可為空"),
  links: yup.array().of(yup.object().shape({
    url: yup.string().required("網址不可為空"),
    title: yup.string().required("網頁標題不可為空"),
  })),
  geoJson: yup.object().shape({
    type: yup.string().required("geoJson 的類型不可為空"),
    features: yup.array().of(yup.object().shape({
      type: yup.string().required("feature 的類型不可為空"),
      properties: yup.object().shape({
        city: yup.string().required("city 不可為空")
      }),
      coordinates: yup.array().of(yup.array().of(yup.number()))
    }))
  }),
});

const updateTravelRequestSchema = yup.object().shape({
  title: yup.string().nullable().default(null),
  startAt: yup.date().nullable().default(null),
  endAt: yup.date().nullable().default(null),
  description: yup.string().nullable().default(null),
  cityId: yup.number().default(null),
  tagIds: yup.array().of(yup.number()),
});

const getTravelsRequestSchema = yup.object().shape({
  keyword: yup.string().nullable().default(null),
  page: yup.number().default(1),
  limit: yup.number().default(20),
});

/**
 * @typedef UpdateTravelNodeDateRequest
 * @property {date} date
 *   - 要修改 旅程 node 日期的 date
 *   - eg: 2022-01-01
 */

/**
 * @typedef NodeLinkInstance
 * @property {string} title
 *   - 網頁的 Title
 *   - eg: 網頁的的抬頭
 * @property {string} url
 *   - 連結網址
 *   - eg: https://google.com.tw/
 */

/**
 * @typedef GeoJsonFeaturePropertyInstance
 * @property {string} city
 *   - 城市的名稱
 *   - eg: Taichung
 */

/**
 * @typedef GeoJsonFeatureGeometryInstance
 * @property {string} type
 *   - GeoJsonFeatureGeometry 的類型
 *   - eg: LineString
 * @property {[[number]]} coordinates
 *   - 座標點 每個陣列都是一個 x,y 的點
 *   - eg: [[120.68645864725113, 24.13755794057052]]
 */

/**
 * @typedef GeoJsonFeatureInstance
 * @property {string} type
 *   - Feature 的類型
 *   - eg: Feature
 * @property {Array.<GeoJsonFeaturePropertyInstance>} properties
 * @property {Array.<GeoJsonFeatureGeometryInstance>} geometry
 */

/**
 * @typedef GeoJsonInstance
 * @property {string} type
 *   - GeoJson 的類型
 *   - eg: FeatureCollection
 * @property {Array.<GeoJsonFeatureInstance>} features
 *   - GeoJson features 的格式
 *   - eg - [{"type":"Feature","properties":{"city":"Taichung"},"geometry":{"type":"LineString","coordinates":[[120.68645864725113,24.13755794057052],[120.6864908337593,24.137565283651107]]}}]
 */

/**
 * @typedef CreateTravelNodeRequest
 * @property {string} title
 *   - 旅程 節點的 Title
 *   - eg: 旅遊節點的抬頭
 * @property {date} startAt
 *   - 旅程的 開始日期
 *   - eg: 2022-01-01 09:00:00
 * @property {number} duringTime
 *   - 旅遊節點 這個節點的分鐘數
 *   - eg: 60
 * @property {string} description
 *   - 旅遊節點的 內容
 *   - eg: 旅遊節點的描述內容
 * @property {Array.<NodeLinkInstance>} links
 *   - 連結文章的網站連結陣列
 *   - eg: 1
 * @property {GeoJsonInstance.model} geoJson
 *   - 綁定標籤的 id 陣列
 *   - eg: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"city":"Taichung"},"geometry":{"type":"LineString","coordinates":[[120.68645864725113,24.13755794057052],[120.6864908337593,24.137565283651107]]}}]}
 */

/**
 * @typedef TravelNode
 * @property {number} id
 *   - 旅程 節點的 ID
 *   - eg: 旅遊節點的ID
 * @property {string} title
 *   - 旅程 節點的 Title
 *   - eg: 旅遊節點的抬頭
 * @property {date} startAt
 *   - 旅程的 開始日期
 *   - eg: 2022-01-01
 * @property {number} duringTime
 *   - 旅遊節點 這個節點的分鐘數
 *   - eg: 60
 * @property {string} description
 *   - 旅遊節點的 內容
 *   - eg: 旅遊節點的描述內容
 * @property {Array.<NodeLinkInstance>} links
 *   - 連結文章的網站連結陣列
 *   - eg: 1
 * @property {GeoJsonInstance.model} location
 *   - 綁定標籤的 id 陣列
 *   - eg: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"city":"Taichung"},"geometry":{"type":"LineString","coordinates":[[120.68645864725113,24.13755794057052],[120.6864908337593,24.137565283651107]]}}]}
 */

/**
 * @typedef UpdateTravelRequest
 * @property {string} title
 *   - 旅程的 Title
 *   - eg: 旅遊的抬頭
 * @property {date} startAt
 *   - 旅程的 開始日期
 *   - eg: 2022-01-01
 * @property {date} endAt
 *   - 旅程的 結束日期
 *   - eg: 2022-01-07
 * @property {string} description
 *   - 旅程的 內容
 *   - eg: 旅遊的描述內容
 * @property {number} cityId
 *   - 旅遊目標的城市 ID
 *   - eg: 1
 * @property {[number]} tagIds
 *   - 綁定標籤的 id 陣列
 *   - eg: [1, 2]
 */

/**
 * @typedef UpdateTravelResponse
 * @property {number} id
 *   - 旅程的 ID
 *   - eg: 旅遊的 ID
 * @property {string} title
 *   - 旅程的 Title
 *   - eg: 旅遊的抬頭
 * @property {date} startAt
 *   - 旅程的 開始日期
 *   - eg: 2022-01-01
 * @property {date} endAt
 *   - 旅程的 結束日期
 *   - eg: 2022-01-07
 * @property {string} description
 *   - 旅程的 內容
 *   - eg: 旅遊的描述內容
 * @property {number} cityId
 *   - 旅遊目標的城市 ID
 *   - eg: 1
 * @property {[number]} tagIds
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
 * @param {number} page.query - 頁數
 * @param {number} limit.query - 每頁幾筆資料
 * @returns {TravelResponse.model} 200 - success, return requested data
 * @returns {string} 400 - invalid request params/query/body
 * @returns {string} 404 - required data not found
 * @security none
 * @typedef TravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
router.get("/", async (req, res) => {
  const validation = await getTravelsRequestSchema.validate(req.query);
  const travelsResult = await getTravelsResult(validation);
  responseOk(res, travelsResult);
});

/**
 * Travel Router.
 * @group Travel
 * @route GET /travels/{travelId}/nodes
 * @param {string} travelId.path.required - travel 的 ID
 * @returns {Array.<TravelNode>} 200 - success, return requested data
 * @returns {string} 400 - invalid request params/query/body
 * @returns {string} 404 - required data not found
 * @security none
 * @typedef TravelNode
 * @property {{integer}} code - response code - eg: 200
 */
 router.get("/:travelId/nodes", async (req, res) => {
  const {travelId} = req.params;
  const travelNodesResult = await getTravelNodesResult(Number(travelId));
  responseOk(res, travelNodesResult);
});

/**
 * Travel Router.
 * @group Travel
 * @route POST /travels
 * @param {TravelRequest.model} data.body.required - the new point
 * @returns {TravelResponse.model} 200 - success, return requested data
 * @returns {string} 400 - invalid request params/query/body
 * @returns {string} 404 - required data not found
 * @security none
 * @typedef TravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
router.post("/", async (req, res) => {
  const validation = await createTravelRequestSchema.validate(req.body);
  await createTravelResult(validation);
  responseOk(res, {});
});

/**
 * Travel Router.
 * @group Travel
 * @route POST /travels/{travelId}/nodes
 * @param {string} travelId.path.required - travel 的 ID
 * @param {CreateTravelNodeRequest.model} data.body.required - the new point
 * @returns {TravelResponse.model} 200 - success, return requested data
 * @returns {string} 400 - invalid request params/query/body
 * @returns {string} 404 - required data not found
 * @security none
 * @typedef TravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
router.post("/:travelId/nodes", async (req, res) => {
  try {
    const validation = await createTravelNodeRequestSchema.validate(req.body);
    const {travelId} = req.params;
    await createTravelNodeResult(travelId, validation);
    responseOk(res, {});
  }catch(error) {
    console.log("🚀 ~ file: travelRouter.js ~ line 293 ~ router.post ~ error", error)
    responseErrWithMsg(res, error.message)
  }
});

/**
 * Travel Router.
 * @group Travel
 * @route PUT /travels/{travelId}
 * @param {string} travelId.path.required - travel 的 ID
 * @param {UpdateTravelRequest.model} data.body.required - the new point
 * @returns {UpdateTravelResponse.model} 200 - success, return requested data
 * @returns {string} 400 - invalid request params/query/body
 * @returns {string} 404 - required data not found
 * @security none
 * @typedef UpdateTravelResponse
 * @property {{integer}} code - response code - eg: 200
 */
router.put("/:travelId", async (req, res) => {
  try {
    const { travelId: travelIdString } = req.params;
    const travelId = Number(travelIdString);
    const validation = await updateTravelRequestSchema.validate(req.body);

    const result = await updateTravelResult(travelId, validation);
    responseOk(res, result);
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});


/**
 * Travel Router.
 * @group Travel
 * @route PUT /travels/{travelId}/nodes/{travelNodeId}/date
 * @param {string} travelId.path.required - travel 的 ID
 * @param {string} travelNodeId.path.required - travel node 的 ID
 * @param {UpdateTravelNodeDateRequest.model} data.body.required - the new point
 * @returns {object} 200 - success, return requested data
 * @returns {string} 400 - invalid request params/query/body
 * @returns {string} 404 - required data not found
 * @security none
 * @typedef object
 * @property {{integer}} code - response code - eg: 200
 */
 router.put("/:travelId/nodes/:travelNodeId/date", async (req, res) => {
  try {
    const { travelId, travelNodeId } = req.params;
    const validation = await updateTravelNodeDateRequestSchema.validate(req.body);
    updateTravelNodeDateResult(travelId, travelNodeId, validation);
    responseOk(res, {});
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
