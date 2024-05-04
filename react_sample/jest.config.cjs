/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // preset: "ts-jest",
  preset: "ts-jest/presets/default-esm",
  // globals: {
  //   "ts-jest": {
  //     useESM: true,
  //   },
  // },
  transform: {
    "\\.[jt]s$": ["ts-jest"],
  },
};

// /** @type {import('jest').Config} */
// const config = {
//   preset: "ts-jest/presets/default-esm",
//   globals: {
//     "ts-jest": {
//       useESM: true,
//     },
//   },
//   transform: {
//     "\\.[jt]s$": "babel-jest",
//   },
//   testEnvironment: "node",
// };
// export default config;
