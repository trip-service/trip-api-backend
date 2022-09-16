const { removeTravelsUnitestResult } = require( "../../services/travelServices" );
const { mockApp } = require("../server.test");

describe("Test travels routes", () => {
  afterAll(async () => {
    return await removeTravelsUnitestResult();
  });

  test("should create travel success", async () => {
    const res = await mockApp
      .post("/travels")
      .set("Content-Type", "application/json")
      .send({ title: "unitest 旅程標題" });
    expect(res.statusCode).toBe(200);
    return;
  });
});
