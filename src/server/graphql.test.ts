import { resolvers } from "./graphql";

describe("graphql tests", () => {
  //
  // TODO: real tests
  test("expect resolvers to have Queries", () => {
    expect(resolvers).toHaveProperty("Query");
  });
});
