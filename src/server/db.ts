import dotenv from "dotenv";
import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuid } from "uuid";

dotenv.config();

const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || "27017";
const name = process.env.MONGO_DB || "list";

const configs = {
  uri: `mongodb://${host}:${port}/${name}`,
  opts: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
};

export interface NoteI extends Document {
  uuid: string;
  name: string;
  done: boolean;
  archived: boolean;
}

const NoteSchema: Schema = new Schema({
  uuid: { type: String, required: true, unique: true },
  note: { type: String, required: true },
  done: { type: Boolean, default: false },
  archived: { type: Boolean, default: false }
});

export const Note = mongoose.model<NoteI>("note", NoteSchema);

//
// seed a note
export const migrate = async () => {
  const text = "write a todo";
  const seed = {
    uuid: uuid(),
    note: text,
    done: false,
    archived: false
  };

  return Note.findOneAndUpdate({ note: text, archived: false }, seed, {
    new: true,
    upsert: true
  });
};

export const db = mongoose.connect(configs.uri, configs.opts, err => {
  console.log('FUCK');
  if (err) {
    return Promise.reject(new Error(`can't connect to the database: ${err}`));
  } else {
    console.log(`\n⚛ Connected to ${configs.uri}`);
    //
    // quick and dirty db migration
    return migrate();
  }
});
