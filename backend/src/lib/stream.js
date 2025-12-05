import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";
import {StreamClient} from  "@stream-io/node-sdk"

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const streamClient=new StreamClient(apiKey,apiSecret);//this is for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this is for chat feature

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Steam User Upserted SuccessFully", userData);
  } catch (error) {
    s.error("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Steam User deleted SuccessFully", userId);
  } catch (error) {
    console.error("Error deleting the Stream user:", error);
  }
};
