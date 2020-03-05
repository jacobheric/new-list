import { gql, PubSub } from "apollo-server-express";
import { Note } from "./db";

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
  }
`;

const pubSub = new PubSub();
const NOTE_CHANGED = "NOTE_CHANGED";

export const resolvers = {
  Query: {
    notes: async (): Promise<any> => await Note.find({})
  },
  Mutation: {
    addNote: async (root: any, args: any) => {
      const note = await Note.findOneAndUpdate(
        { uuid: args.note.uuid },
        args.note,
        {
          new: true,
          upsert: true
        }
      );
      pubSub.publish(NOTE_CHANGED, { noteChanged: note });
      return note;
    }
  },
  Subscription: {
    noteChanged: {
      subscribe: () => pubSub.asyncIterator([NOTE_CHANGED])
    }
  }
};
