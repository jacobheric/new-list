import { gql } from "apollo-server-express";
import { Notes } from "../config";

export const typeDefs = gql`
type Note {
   uuid: String!
   note: String!
   done: Boolean!
   archived: Boolean!
}

input NoteI {
   uuid: String!
   note: String!
   done: Boolean!
   archived: Boolean!
}

type Query {
   notes: [Note]
}

type Mutation {
  addNote(note: NoteI!): Note
}`;

export const resolvers = {
   Query: {
      notes: async (): Promise<any> => await Notes.findAll()
   },
   Mutation: {
      //
      // returned upserts are not supported with
      // sqlite so just echo back the input
      addNote: async (root: any, args: any) =>
         Notes.upsert(args.note).then(() => args.note)
   }
};
