const { mockApp } = require("../server.test");
const yup = require("yup");

const responseSchema = yup.array().of(
  yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
  })
);

describe("Test tags routes", () => {
  it("should get tags by mockUser success", (done) => {
    mockApp
      .get("/tags")
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200);

        done();
      })
      .catch(done);
  });

  it("should the response data format right", (done) => {
    mockApp
      .get("/tags")
      .send()
      .then((res) => {
        const { data } = res.body;

        const isValid = responseSchema.isValidSync(data);

        expect(isValid).toBe(true);

        done();
      })
      .catch(done);
  });
});
