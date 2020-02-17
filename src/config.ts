import * as dotenv from "dotenv";
import { DataTypes, Sequelize, UUID } from "sequelize";
import { v4 as uuid } from 'uuid';

dotenv.config();

export const PORT = 3000;

export const db = new Sequelize("sqlite::memory:");

db.define('notes', {
   uuid: {
      unique: true,
      allowNull: false,
      type: UUID,
      defaultValue: uuid(),
   },
   note: {
      type: DataTypes.STRING,
      allowNull: false
   },
   done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
});

//
// seed a note record
export const migrate = () =>
   Notes.upsert({ uuid: uuid(), note: 'write a todo app', done: false, archived: false });


export const Notes = db.models.notes;



