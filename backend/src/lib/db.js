import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if(!ENV.DB_URL){
      throw new Error("DB Error is not defined in envrionment variables");
    }
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("DB Connection Successful", conn.connection.host);
  } catch (error) {
    console.error(("Error while connecting to MongoDB", error));
    process.exit(1);
  }
};

