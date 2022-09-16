const { mockApp } = require("../server.test");
const yup = require("yup");

const responseSchema = yup.array().of(
  yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
  })
);

describe("Test tags routes", () => {
  it("should get tags by mockTags success", async () => {
    const res = await mockApp.get("/tags").send();
    expect(res.statusCode).toBe(200);

    return;
  });

  it("should the response data format right", async () => {
    const res = await mockApp.get("/tags").send();

    const isValid = responseSchema.isValidSync(res.body);
    expect(isValid).toBe(true);

    return;
  });
});
