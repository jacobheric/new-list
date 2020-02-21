import { gql } from "apollo-server-express";
import { Notes } from "./db";

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
      addNote: async (root: any, args: any) =>
         Notes.findOrCreate({where: {uuid: args.note.uuid}, defaults: args.note})
            .then(([note, created]: [any, boolean] ) =>
               created ? note.get({ plain: true }) : note.update(args.note)
            )

   }
};
