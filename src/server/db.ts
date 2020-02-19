import dotenv from "dotenv";
import { DataTypes, Dialect, Sequelize, UUID } from "sequelize";
import { v4 as uuid } from 'uuid';

dotenv.config();

const dialect = process.env.DB_DIALECT || 'sqlite';

if (dialect !== 'postgres' && dialect !== 'sqlite') {
   throw new TypeError(`App only supports postgres or sqlite db dialect`);
}

//
// defaults to sqlite in memory if no other specific params are provided
export const dbConfig =  {
   username: process.env.DB_USER as string,
   password: process.env.DB_PASSWORD as string,
   database: process.env.DB_NAME as string,
   host: (process.env.DB_HOST || "localhost") as string,
   port: Number(process.env.DB_PORT || "5432"),
   dialect: dialect as 'postgres' | 'sqlite',
   storage: process.env.DB_STORAGE as string,
   logging: false
};

export const db = new Sequelize(dbConfig);

db.define('notes', {
   uuid: {
      primaryKey: true,
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
export const migrate = () => {
   const seed = { uuid: uuid(), note: 'write a todo app', done: false, archived: false };
   return Notes.findOrCreate({where: {note: seed.note}, defaults: seed});
}
export const Notes = db.models.notes;



