module.exports = {
  testPathIgnorePatterns: ["<rootDir>/__tests__/server.test.js"],
  collectCoverage: true,
  collectCoverageFrom: ["./controllers/**", "./services/**", "!./controllers/index.js"],
  coverageThreshold: {
    global: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
};
