export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverage: true,
  coverageProvider: "babel",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/infra/test-utils/jest.setup.js"],
  collectCoverageFrom: ["./src/**/*.[jt]s"],
};
