/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    "\\.[jt]s$": "babel-jest",
  },
};
export default config;
