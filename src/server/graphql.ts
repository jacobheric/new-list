import { gql } from "apollo-server-express";
import { Notes } from "../config";
import { tag } from "../client/util";

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
      addNote: async (root: any, args: any) => {
         console.log('args', args);
         //
         // returned upserts are not supported with
         // sqlite so just echo back the input
         return Notes.upsert(args.note).then(() => args.note);
      },
   }
};
