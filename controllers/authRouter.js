const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const yup = require("yup");

const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { signInOrSignUpGoogleUser } = require("../services/memberServices");
const { jwtAuthorizationMiddleware } = require("../helpers/passportManager");

const router = express.Router();

const { AUTH_SECRET } = process.env;

/**
 * @typedef LogoutRequest
 * @property {boolean} success.required
 *   - logout response status
 *   - eg: true
 */

/**
 * Logout API.
 * @group authorization
 * @route POST /auth/logout
 * @returns {LogoutResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef LogoutResponse
 * @property {{integer}} code - response code - eg: 200
 */

router.post("/logout", jwtAuthorizationMiddleware, async (req, res) => {
  try {
    return responseOk(res, { success: true });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

const loginRequestSchema = yup.object({
  os: yup.string().oneOf(["ios", "android"]).required("系統欄位不可為空"),
  token: yup.string().required("Google 令牌不可為空"),
  notificationToken: yup.string().required("推播令牌不可為空"),
});

/**
 * @typedef LoginRequest
 * @property {enum} os.required
 *   - App 系統
 *   - eg: ios,android
 * @property {string} token.required
 *   - google 的令牌
 *   - eg: 12j3lkjdlaj
 * @property {string} notificationToken.required
 *   - 推播 的令牌
 *   - eg: 12j3lkjdlaj
 */

/**
 * @typedef MemberInformation
 * @property {number} id.required
 *  - member Id
 *  - eg: 1
 * @property {string} email.required
 *  - 會員的信箱地址
 *  - eg: aaa@bbb.com
 * @property {string} name.required
 *  - 會員的名稱
 *  - tomasdemo
 */

/**
 * @typedef LoginResponse
 * @property {[string]} token.required - JWT token string
 * @property {{integer}} expiredIn.required - JWT expired timestamp
 * @property {MemberInformation.model} info.required - member information
 */

/**
 * LogIn API.
 * @group authorization
 * @route POST /auth
 * @param {LoginRequest.model} data.body.required - the new point
 * @returns {LoginResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security none
 * @typedef LoginResponse
 * @property {{integer}} code - response code - eg: 200
 */
router.post("/login", async (req, res) => {
  try {
    const validation = await loginRequestSchema.validate(req.body);
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${validation.token}` },
      }
    );
    const memberResult = await signInOrSignUpGoogleUser(userInfoResponse.data);
    const signInfo = pick(memberResult, ["id", "email"]);
    const token = jwt.sign(
      {
        data: signInfo,
        // exp: expireIn,
      },
      AUTH_SECRET
    );
    return responseOk(res, {
      token,
      expireIn: null,
      info: memberResult,
    });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
