const dotenv = require('dotenv');

dotenv.config();

const expressApp = require("../helpers/expressAppHelper");
const request = require("supertest");

process.on('uncaughtException', () => false);

module.exports.mockApp = request(expressApp);
