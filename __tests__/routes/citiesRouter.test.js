const { mockApp } = require("../server.test");

describe("Test cities routes", () => {
  it("should get cities by mockUser success", (done) => {
    mockApp
      .get("/cities")
      .send()
      .expect(200)
      .catch(done);
  });

  it("should the response data format right", (done) => {
    mockApp
      .get("/cities")
      .send()
      .then((res) => {
        const { data } = res.body;
        expect(Array.isArray(data)).toBe(true);

        data.forEach(({ id, name }) => {
          expect(typeof id === "number").toBe(true);
          expect(typeof name === "string").toBe(true);
        });

        done();
      })
      .catch(done);
  });
});
