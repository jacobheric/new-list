module.exports = {
   "roots": [
      "<rootDir>/src"
   ],
   "transform": {
      "^.+\\.tsx?$": "ts-jest"
   },
   "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
   "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
   ],
   //
   // enzyme
   "snapshotSerializers": ["enzyme-to-json/serializer"],
   "setupFilesAfterEnv": ["<rootDir>/src/client/enzyme.ts"]
}
