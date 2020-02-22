import { gql, PubSub } from "apollo-server-express";
import { Notes } from "./db";
import { echo } from "../client/util";

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
}

type Subscription {
   noteChanged: Note  
}`;

const pubSub = new PubSub();
const NOTE_CHANGED = 'NOTE_CHANGED';

export const resolvers = {
   Query: {
      notes: async (): Promise<any> => await Notes.findAll()
   },
   Mutation: {
      addNote: async (root: any, args: any) =>
         Notes.findOrCreate({ where: { uuid: args.note.uuid }, defaults: args.note })
            .then(([note, created]: [any, boolean]) => {
               pubSub.publish(NOTE_CHANGED, { noteChanged: args.note });
               return created ? note.get({ plain: true }) : note.update(args.note);
            })
   },
   Subscription: {
      noteChanged: {
         subscribe: () => pubSub.asyncIterator([ NOTE_CHANGED ]),
      }
   }
};
