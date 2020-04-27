import * as dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT || 3000);
export const HOST = process.env.HOST || "localhost";

export const feature = {
  realTime: true
};
