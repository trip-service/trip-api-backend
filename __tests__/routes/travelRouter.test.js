const { removeTravelsUnitestResult } = require("../../services/travelServices");
const { mockApp } = require("../server.test");

const mockDataForEditTravel = {
  title: "edittest 旅程標題",
  startAt: "2022-01-01T00:00:00.000Z",
  endAt: "2022-01-07T00:00:00.000Z",
  description: "旅遊的描述內容",
  cityId: 1,
  tagIds: [1, 2],
};

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
    res.body.rows.map((travel) => {
      expect(/unitest/.test(travel.title)).toBe(true);
      expect(travel.description).toBe(null);
      expect(travel.startAt).toBe(null);
      expect(travel.endAt).toBe(null);
      expect(travel.city).toBe(null);
      expect(travel.tags.length).toBe(0);
    });
    return;
  });

  test("should edit travel success", async () => {
    const travelRes = await mockApp
      .get("/travels")
      .set("Content-Type", "application/json")
      .query({ page: 1, limit: 1, keyword: "unitest" });

    const { id } = travelRes.body.rows[0];

    const res = await mockApp
      .put(`/travels/${id}`)
      .set("Content-Type", "application/json")
      .send(mockDataForEditTravel);

    const updatedRes = res.body;

    expect(res.statusCode).toBe(200);
    expect(updatedRes.id).toBe(id);
    expect(updatedRes.title).toBe(mockDataForEditTravel.title);
    expect(updatedRes.description).toBe(mockDataForEditTravel.description);
    expect(updatedRes.city.id).toBe(mockDataForEditTravel.cityId);
    expect(updatedRes.startAt).toBe(mockDataForEditTravel.startAt);
    expect(updatedRes.endAt).toBe(mockDataForEditTravel.endAt);

    updatedRes.tags.forEach(({ id }) => {
      const isIdExist = mockDataForEditTravel.tagIds.includes(id);

      expect(isIdExist).toBe(true);
    });

    return;
  });
});
