const { mockApp } = require("../server.test");
const yup = require("yup");

const responseSchema = yup.array().of(
  yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
  })
);

describe("Test cities routes", () => {
  it("should get cities by mockUser success", (done) => {
    mockApp
      .get("/cities")
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200);

        done();
      })
      .catch(done);
  });

  it("should the response data format right", (done) => {
    mockApp
      .get("/cities")
      .send()
      .then((res) => {
        const isValid = responseSchema.isValidSync(res.body);

        expect(isValid).toBe(true);

        done();
      })
      .catch(done);
  });
});
