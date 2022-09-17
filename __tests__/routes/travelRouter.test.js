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

  test("should get travels success", async () => {
    const res = await mockApp
      .get("/travels")
      .set("Content-Type", "application/json")
      .query({ page: 1, limit: 10, keyword: "unitest" });

      expect(res.statusCode).toBe(200);
      expect(res.body.rows.length).toBe(1);
      res.body.rows.map(travel => {
        expect(/unitest/.test(travel.title)).toBe(true);
        expect(travel.description).toBe(null);
        expect(travel.startAt).toBe(null);
        expect(travel.endAt).toBe(null);
        expect(travel.city).toBe(null);
        expect(travel.tags.length).toBe(0);
      })
    return;
  });
});
