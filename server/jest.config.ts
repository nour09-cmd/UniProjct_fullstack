import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/test/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  verbose: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;
