module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/*.test.(ts|tsx)", "**/*.spec.(ts|tsx)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  }
};
