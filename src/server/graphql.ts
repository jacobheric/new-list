import { gql } from "apollo-server-express";
import { Notes } from "../config";

export const typeDefs = gql`
type Note {
   uuid: String!
   note: String!
   done: Boolean!
   archived: Boolean!
}
type Query {
   notes: [Note]
}`;

export const resolvers = {
   Query: {
      notes: async (): Promise<any> => await Notes.findAll()
   }
};
