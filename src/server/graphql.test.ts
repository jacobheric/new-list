import { resolvers } from "./graphql";

//
// TODO: real tests
test("expect resolvers to have Queries", () => {
   expect(resolvers).toHaveProperty('Query');
});
