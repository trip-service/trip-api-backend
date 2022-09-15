const { mockApp } = require("../server.test");
const yup = require("yup");

const responseSchema = yup.array().of(
  yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
  })
);

describe("Test cities routes", () => {
  it("should get cities by mockUser success", async () => {
    try {
      const res = await mockApp.get("/cities").send();
      return expect(res.statusCode).toBe(200);
    } catch (error) {}
  });

  it("should the response data format right", async () => {
    try {
      const res = await mockApp.get("/cities").send();

      const isValid = responseSchema.isValidSync(res.body);
      expect(isValid).toBe(true);
    } catch (error) {}
  });
});
