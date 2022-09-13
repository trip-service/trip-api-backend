const { mockApp } = require("../server.test");

describe("Test cities routes", () => {
  beforeAll((done) => {
    try {
      done();
    } catch (error) {
      done(error);
    }
  });

  afterAll((done) => {
    try {
      done();
    } catch (error) {
      done(error);
    }
  });

  it("should get cities by mockUser success", (done) => {
    mockApp
      .get("/cities")
      .send()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(done);
  });
});
